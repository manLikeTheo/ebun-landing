import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

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
          background: "#0E0D0B",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(201,168,76,0.55)",
            borderRadius: "50%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 18,
              height: 20,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 2,
                height: 20,
                background: "#C9A84C",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 15,
                height: 2,
                background: "#C9A84C",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 9,
                width: 11,
                height: 2,
                background: "#C9A84C",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: 15,
                height: 2,
                background: "#C9A84C",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}