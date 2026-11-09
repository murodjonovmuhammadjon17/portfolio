import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/content/settings";

export async function GET() {
  const s = await getSiteSettings();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#E9DCAE",
          padding: 72,
          color: "#000000",
        }}
      >
        <div style={{ fontSize: 34, color: "#555555" }}>Portfolio</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700 }}>{s.name}</div>
          <div style={{ fontSize: 40, marginTop: 16, color: "#555555" }}>
            {s.tagline}
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#8A5A14" }}>UX/UI · Product design</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
