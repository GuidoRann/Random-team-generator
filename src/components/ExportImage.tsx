import { useRef, useCallback } from "react";
import type { RefObject, CSSProperties } from "react";
import { toPng, toJpeg, toSvg } from "html-to-image";

export type ExportImageOptions = {
  type?: "png" | "jpeg" | "svg";
  fileName?: string;
  quality?: number;
  pixelRatio?: number;
  backgroundColor?: string;
  filter?: (node: HTMLElement) => boolean;
  fullHeight?: boolean;
  canvasWidth?: number;
  canvasHeight?: number;
  style?: CSSProperties;
};

type ExportImageReturn = {
  ref: RefObject<HTMLElement | null>;
  exportImage: (fileNameOverride?: string) => Promise<string | void>;
  exportPng: (fileNameOverride?: string) => Promise<string | void>;
  exportJpeg: (fileNameOverride?: string) => Promise<string | void>;
  exportSvg: (fileNameOverride?: string) => Promise<string | void>;
};

export default function useExportImage(
  options: ExportImageOptions = {}
): ExportImageReturn {
  const {
    type = "jpeg",
    fileName = "grupos",
    quality = 0.85,
    pixelRatio = 2,
    backgroundColor = "#ffffff",
    filter,
    fullHeight = true,
    canvasWidth,
    canvasHeight,
    style,
  } = options;

  const ref = useRef<HTMLElement>(null);

  const capture = useCallback(
    async (fmt: "png" | "jpeg" | "svg", name?: string) => {
      const node = ref.current;
      if (!node) return;

      // Asegura que las fuentes web estén listas (si las hay)
      await (document as any).fonts?.ready?.catch?.(() => {});

      const width = fullHeight ? node.scrollWidth : undefined;
      const height = fullHeight ? node.scrollHeight : undefined;

      const commonOpts: any = {
        cacheBust: true,
        backgroundColor,
        filter,
        pixelRatio,
        width,
        height,
        canvasWidth,
        canvasHeight,
        style: {
          ...style,
          // Evita recortes por overflow al clonar
          overflow: fullHeight ? "visible" : undefined,
        },
        quality: fmt === "jpeg" ? quality : undefined,
      };

      let dataUrl: string;
      if (fmt === "png") dataUrl = await toPng(node, commonOpts);
      else if (fmt === "jpeg") dataUrl = await toJpeg(node, commonOpts);
      else dataUrl = await toSvg(node, commonOpts);

      const link = document.createElement("a");
      link.download = `${name ?? fileName}.${fmt === "jpeg" ? "jpg" : fmt}`;
      link.href = dataUrl;
      link.click();

      return dataUrl;
    },
    [
      backgroundColor,
      canvasHeight,
      canvasWidth,
      fileName,
      filter,
      fullHeight,
      pixelRatio,
      quality,
      style,
    ]
  );

  const exportImage = useCallback(
    (name?: string) => capture(type, name),
    [capture, type]
  );

  const exportPng = useCallback((name?: string) => capture("png", name), [capture]);
  const exportJpeg = useCallback((name?: string) => capture("jpeg", name), [capture]);
  const exportSvg = useCallback((name?: string) => capture("svg", name), [capture]);

  return { ref: ref!, exportImage, exportPng, exportJpeg, exportSvg };
}
