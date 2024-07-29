import { useCallback, useEffect, useState } from "react";
import { Size } from "../utils/types";

export function getElementSize(element: Element) {
  const { width, height } = element.getBoundingClientRect();
  return { width: Math.floor(width), height: Math.floor(height) };
}

export function useResizable<T extends Element>(element?: T) {
  const [size, setSize] = useState<Size>();
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

  return size;
}
