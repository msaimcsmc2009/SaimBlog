import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b0a",
          borderRadius: 8,
          fontFamily: "monospace",
          fontSize: 20,
          fontWeight: 700,
          color: "#c9f13d",
        }}
      >
        s.
      </div>
    ),
    { ...size }
  );
}
