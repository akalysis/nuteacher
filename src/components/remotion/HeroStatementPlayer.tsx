"use client";

import { Player } from "@remotion/player";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const statement = "Research, teaching, methods, and notes for applied health evidence.";

function HeroStatementComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = 6;
  const framesPerCharacter = 1.18;
  const visibleCharacters = Math.min(
    statement.length,
    Math.max(0, Math.floor((frame - startFrame) / framesPerCharacter))
  );
  const visibleText = statement.slice(0, visibleCharacters);
  const cursorOpacity = Math.round(frame / (fps / 3)) % 2 === 0 ? 1 : 0;
  const ruleScale = interpolate(frame, [0.3 * fps, 1.25 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const markerOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        color: "#10231f",
        fontFamily: "IBM Plex Sans, system-ui, sans-serif",
        justifyContent: "center",
        overflow: "hidden",
        padding: "10px 0 18px",
      }}
    >
      <div
        style={{
          background: "#0d4a3c",
          height: 6,
          opacity: markerOpacity,
          transform: `scaleX(${ruleScale})`,
          transformOrigin: "left center",
          width: 168,
        }}
      />
      <div
        style={{
          color: "#10231f",
          fontFamily: "Source Serif 4, Georgia, serif",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "-0.018em",
          lineHeight: 0.98,
          marginTop: 28,
          maxWidth: 760,
          minHeight: 304,
        }}
      >
        {visibleText}
        <span
          style={{
            color: "#2f7657",
            opacity: visibleCharacters >= statement.length ? 0 : cursorOpacity,
          }}
        >
          |
        </span>
      </div>
    </AbsoluteFill>
  );
}

export function HeroStatementPlayer() {
  return (
    <Player
      acknowledgeRemotionLicense
      autoPlay
      component={HeroStatementComposition}
      compositionHeight={410}
      compositionWidth={840}
      controls={false}
      durationInFrames={150}
      fps={30}
      initiallyMuted
      moveToBeginningWhenEnded={false}
      style={{
        display: "block",
        width: "100%",
      }}
    />
  );
}
