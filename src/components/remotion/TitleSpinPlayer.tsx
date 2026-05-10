"use client";

import { Player } from "@remotion/player";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const routes = ["Methods", "Research", "Teaching", "Blog"];

function TitleSpinComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 18,
      mass: 0.9,
      stiffness: 115,
    },
  });

  const opacity = interpolate(frame, [0, 0.55 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const rotateY = interpolate(entrance, [0, 1], [-78, 0]);
  const rotateX = interpolate(frame, [0, 0.95 * fps], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const lift = interpolate(entrance, [0, 1], [28, 0]);
  const subtitleOpacity = interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sweep = interpolate(frame % (4 * fps), [0, 4 * fps], [-22, 122], {
    easing: Easing.bezier(0.45, 0, 0.2, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #17201d 0%, #22302b 52%, #f6f8f5 52%, #ffffff 100%)",
        color: "#f8faf7",
        fontFamily: "IBM Plex Sans, system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(248, 250, 247, 0.08) 1px, transparent 1px), linear-gradient(180deg, rgba(248, 250, 247, 0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          inset: 0,
          opacity: 0.7,
          position: "absolute",
        }}
      />
      <div
        style={{
          background:
            "radial-gradient(circle at 18% 28%, rgba(210, 161, 70, 0.38), transparent 24%), radial-gradient(circle at 78% 64%, rgba(52, 95, 132, 0.28), transparent 30%)",
          inset: 0,
          position: "absolute",
        }}
      />
      <div
        style={{
          alignItems: "center",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          height: "100%",
          padding: "62px 70px",
          position: "relative",
        }}
      >
        <div
          style={{
            opacity,
            transform: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${lift}px)`,
            transformOrigin: "left center",
          }}
        >
          <div
            style={{
              color: "#f5d487",
              fontSize: 21,
              fontWeight: 800,
              letterSpacing: "0.08em",
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            Andrew Kingston
          </div>
          <div
            style={{
              fontFamily: "Source Serif 4, Georgia, serif",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.015em",
              lineHeight: 0.94,
              maxWidth: 650,
            }}
          >
            Research and teaching repository
          </div>
          <div
            style={{
              color: "rgba(248, 250, 247, 0.82)",
              fontSize: 27,
              lineHeight: 1.3,
              marginTop: 28,
              maxWidth: 610,
              opacity: subtitleOpacity,
            }}
          >
            Applied statistics, ageing, surveys, software, and health evidence.
          </div>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(23, 32, 29, 0.13)",
            borderRadius: 8,
            boxShadow: "0 28px 70px rgba(23, 32, 29, 0.18)",
            color: "#17201d",
            display: "grid",
            gap: 16,
            justifySelf: "end",
            minWidth: 320,
            overflow: "hidden",
            padding: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              background: `linear-gradient(90deg, transparent, rgba(210, 161, 70, 0.38), transparent)`,
              height: "100%",
              left: `${sweep}%`,
              position: "absolute",
              top: 0,
              transform: "skewX(-16deg)",
              width: 90,
            }}
          />
          {routes.map((route, index) => {
            const itemOpacity = interpolate(
              frame,
              [(0.35 + index * 0.12) * fps, (0.9 + index * 0.12) * fps],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }
            );
            const itemX = interpolate(itemOpacity, [0, 1], [22, 0]);

            return (
              <div
                key={route}
                style={{
                  alignItems: "center",
                  borderBottom:
                    index === routes.length - 1 ? "none" : "1px solid rgba(23, 32, 29, 0.12)",
                  display: "flex",
                  fontSize: 25,
                  fontWeight: 800,
                  justifyContent: "space-between",
                  opacity: itemOpacity,
                  paddingBottom: index === routes.length - 1 ? 0 : 14,
                  position: "relative",
                  transform: `translateX(${itemX}px)`,
                }}
              >
                <span>{route}</span>
                <span
                  style={{
                    color: ["#1c6b57", "#345f84", "#a66b1f", "#873244"][index],
                    fontSize: 18,
                  }}
                >
                  0{index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function TitleSpinPlayer() {
  return (
    <Player
      acknowledgeRemotionLicense
      autoPlay
      component={TitleSpinComposition}
      compositionHeight={420}
      compositionWidth={1100}
      controls={false}
      durationInFrames={150}
      fps={30}
      initiallyMuted
      loop
      style={{
        borderRadius: 8,
        display: "block",
        overflow: "hidden",
        width: "100%",
      }}
    />
  );
}
