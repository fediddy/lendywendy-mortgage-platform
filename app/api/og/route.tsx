import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "LendyWendy";
  const subtitle = searchParams.get("subtitle") || "California Real Estate Lending";
  const badge = searchParams.get("badge") || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#020617",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #f59e0b, #d97706)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "#020617",
            }}
          >
            W
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Lendy
            <span style={{ color: "#f59e0b" }}>Wendy</span>
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "#f59e0b",
              padding: "8px 20px",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "24px",
              width: "fit-content",
            }}
          >
            {badge}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: "20px",
            display: "flex",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            lineHeight: 1.4,
            display: "flex",
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "60px",
            right: "60px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              color: "#f59e0b",
              fontWeight: 600,
              display: "flex",
            }}
          >
            lendywendy.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
