"use client";

import type { ComponentProps } from "react";

import { formatHex, oklch } from "culori";
import QR from "qrcode";
import { useEffect, useState } from "react";
import { cn } from "tailwind-variants";

export type QRCodeProps = ComponentProps<"div"> & {
  data: string;
  foreground?: string;
  background?: string;
  robustness?: "L" | "M" | "Q" | "H";
};

const oklchRegex = /oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/;

const getOklch = (color: string, fallback: [number, number, number]) => {
  const oklchMatch = color.match(oklchRegex);

  if (!oklchMatch) {
    return { l: fallback[0], c: fallback[1], h: fallback[2] };
  }

  return {
    l: Number.parseFloat(oklchMatch[1] ?? "0"),
    c: Number.parseFloat(oklchMatch[2] ?? "0"),
    h: Number.parseFloat(oklchMatch[3] ?? "0"),
  };
};

export const QRCode = ({
  data,
  foreground,
  background,
  robustness = "M",
  className,
  ...props
}: QRCodeProps) => {
  const [svg, setSVG] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const styles = getComputedStyle(document.documentElement);
        const foregroundColor =
          foreground ?? (styles.getPropertyValue("--kb-foreground") || "");
        const backgroundColor =
          background ?? (styles.getPropertyValue("--kb-background") || "");

        const foregroundOklch = getOklch(
          foregroundColor,
          [0.21, 0.006, 285.885]
        );
        const backgroundOklch = getOklch(backgroundColor, [0.985, 0, 0]);

        const newSvg = await QR.toString(data, {
          type: "svg",
          color: {
            dark: formatHex(oklch({ mode: "oklch", ...foregroundOklch })),
            light: formatHex(oklch({ mode: "oklch", ...backgroundOklch })),
          },
          width: 200,
          errorCorrectionLevel: robustness,
          margin: 0,
        });

        setSVG(newSvg);
      } catch (error) {
        console.error(error);
      }
    };

    generateQR();
  }, [data, foreground, background, robustness]);

  if (!svg) {
    return null;
  }

  return (
    <div
      className={cn("size-full", "[&_svg]:size-full", className)}
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
};
