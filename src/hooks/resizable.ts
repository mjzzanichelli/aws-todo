import { createRef, useCallback, useEffect, useState } from "react";
import { Size } from "../utils/types";

export function getElementSize(element: Element) {
  const { width, height } = element.getBoundingClientRect();
  return { width: Math.floor(width), height: Math.floor(height) };
}

export function useResizable<T extends Element>() {
  const ref = createRef<T>();
  const [size, setSize] = useState<Size>();
  const [element, setElement] = useState<T>();

  useEffect(() => {
    const { current } = ref;
    setElement((element) => {
      if (!current) return undefined;
      return current !== element ? current : element;
    });
  }, [ref]);

  const updateSize = useCallback(
    (current: Size) => {
      setSize((previous?: Size) => {
        const width = Math.floor(current.width);
        const height = Math.floor(current.height);
        current = { width, height };
        if (!previous || previous.width !== width || previous.height !== height)
          return current;
        return previous;
      });
    },
    [setSize]
  );

  useEffect(() => {
    if (!element) return;
    updateSize(getElementSize(element));

    const resizeObserver = new ResizeObserver(([{ contentRect }]) => {
      const { width, height } = contentRect;
      updateSize({ width, height });
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, [element, updateSize]);

  return { size, ref };
}
