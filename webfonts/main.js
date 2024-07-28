const path = require("path");
const fs = require("fs/promises");
const webfontsGenerator = require("webfonts-generator");

function root(...paths) {
  return path.join(__dirname, ...paths);
}

const fontName = "custom";

function fontPath(...name) {
  return root("fonts", fontName, ...name);
}

function iconsPath(...name) {
  return root("icons", ...name);
}

const codepoints = require(iconsPath("codepoints.json"));

function sourcePath(...name) {
  return fontPath("source", ...name);
}

const dest = fontPath("style");

fs.rm(sourcePath(), { recursive: true, force: true })
  .then(() => fs.mkdir(sourcePath(), { recursive: true }))
  .then(() => fs.readdir(iconsPath()))
  .then((files) => {
    return files.reduce((promise, file) => {
      return promise.then(({ icons }) => {
        const iconFilePath = iconsPath(file);
        const { ext, name } = path.parse(iconFilePath);

        if (ext !== ".svg") return Promise.resolve({ icons });

        return fs.lstat(iconFilePath).then((stat) => {
          if (!stat.isFile()) return Promise.resolve({ icons });

          const filePath = sourcePath(name + ext);
          return fs.copyFile(iconFilePath, filePath).then(() => {
            const iconCode = codepoints[name];
            icons.push({
              filePath,
              name,
              iconCode,
            });

            return Promise.resolve({
              icons,
            });
          });
        });
      });
    }, Promise.resolve({ icons: [] }));
  })
  .then(({ icons }) => {
    return Promise.resolve(icons);
  })
  .then((icons) => {
    const { codepoints, files } = icons.reduce(
      ({ codepoints, files }, { name, iconCode, filePath }) => {
        codepoints = {
          ...codepoints,
          [name]: iconCode,
        };
        files.push(filePath);
        return {
          codepoints,
          files,
        };
      },
      { codepoints: {}, files: [] }
    );

    return fs
      .rm(dest, { recursive: true, force: true })
      .then(() => fs.mkdir(dest, { recursive: true }))
      .then(() => {
        return fs.writeFile(
          fontPath(`codepoints.json`),
          JSON.stringify(codepoints, null, 2)
        );
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          webfontsGenerator(
            {
              files,
              codepoints,
              dest,
              fontName: `${fontName}icons`,
              types: ["eot", "woff2", "woff", "ttf", "svg"],
              templateOptions: {
                classPrefix: `${fontName}icons-`,
                baseSelector: `.${fontName}icons`,
              },
            },
            function (error, result) {
              if (err) return reject(error);
              return resolve(result);
            }
          );
        });
      });
  });
