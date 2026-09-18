import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#0a0b0a",
          backgroundImage:
            "linear-gradient(#1a1c18 1px, transparent 1px), linear-gradient(90deg, #1a1c18 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 460,
            height: 460,
            borderRadius: 460,
            background: "#c9f13d",
            opacity: 0.22,
            filter: "blur(10px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, color: "#c9f13d", fontFamily: "monospace" }}>
          {siteConfig.name.toLowerCase()}.dev
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 64,
            fontWeight: 700,
            color: "#edefec",
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          Fikirleri çalışan yazılıma dönüştürüyorum.
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#96a096" }}>
          {siteConfig.role} · {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
