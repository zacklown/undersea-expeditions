"use client";

import type { UIFieldClientComponent } from "payload";

import { useField } from "@payloadcms/ui";
import React, { useCallback, useMemo, useRef } from "react";

type TripMapPickerProps = {
  colorPath: string;
  imageSrc: string;
  showOnHomepagePath: string;
  xPath: string;
  yPath: string;
};

const pinColors = [
  { hex: "#D88906", label: "Amber", value: "amber" },
  { hex: "#F4A261", label: "Apricot", value: "apricot" },
  { hex: "#56CFE1", label: "Aqua", value: "aqua" },
  { hex: "#A23E8A", label: "Berry", value: "berry" },
  { hex: "#F2B5D4", label: "Blush", value: "blush" },
  { hex: "#B85C38", label: "Brick", value: "brick" },
  { hex: "#B7791F", label: "Bronze", value: "bronze" },
  { hex: "#E76F51", label: "Coral", value: "coral" },
  { hex: "#B22222", label: "Crimson", value: "crimson" },
  { hex: "#1D4E89", label: "Deep Blue", value: "deep-blue" },
  { hex: "#2D8F5A", label: "Emerald", value: "emerald" },
  { hex: "#2F5D50", label: "Forest", value: "forest" },
  { hex: "#C5A059", label: "Gold", value: "gold" },
  { hex: "#FF4F8B", label: "Hot Pink", value: "hot-pink" },
  { hex: "#4B3F93", label: "Indigo", value: "indigo" },
  { hex: "#A78BFA", label: "Lavender", value: "lavender" },
  { hex: "#FFD166", label: "Lemon", value: "lemon" },
  { hex: "#8BD3C7", label: "Mint", value: "mint" },
  { hex: "#0077B6", label: "Ocean", value: "ocean" },
  { hex: "#C77DFF", label: "Orchid", value: "orchid" },
  { hex: "#006D77", label: "Peacock", value: "peacock" },
  { hex: "#6E3B6E", label: "Plum", value: "plum" },
  { hex: "#2A9D8F", label: "Seafoam", value: "seafoam" },
  { hex: "#C96F4A", label: "Terracotta", value: "terracotta" },
] as const;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

export const TripMapPickerField: UIFieldClientComponent = (props) => {
  const { colorPath, field, imageSrc, showOnHomepagePath, xPath, yPath } = props as typeof props &
    TripMapPickerProps;
  const mapRef = useRef<HTMLButtonElement | null>(null);
  const { setValue: setColor, value: colorValue } = useField<string>({ path: colorPath });
  const { setValue: setShowOnHomepage, value: showOnHomepageValue } = useField<boolean>({
    path: showOnHomepagePath,
  });
  const { setValue: setX, value: xValue } = useField<number>({ path: xPath });
  const { setValue: setY, value: yValue } = useField<number>({ path: yPath });
  const heading = typeof field?.label === "string" ? field.label : "Homepage Map Pin";

  const color = useMemo(
    () => pinColors.find((option) => option.value === colorValue) || pinColors[0],
    [colorValue],
  );
  const showOnHomepage = Boolean(showOnHomepageValue);
  const hasPin = isFiniteNumber(xValue) && isFiniteNumber(yValue);

  const updatePinPosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!mapRef.current) {
        return;
      }

      const bounds = mapRef.current.getBoundingClientRect();
      const xPercent = clamp(((clientX - bounds.left) / bounds.width) * 100, 0, 100);
      const yPercent = clamp(((clientY - bounds.top) / bounds.height) * 100, 0, 100);

      setX(Number(xPercent.toFixed(1)));
      setY(Number(yPercent.toFixed(1)));
    },
    [setX, setY],
  );

  const handleMapClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      updatePinPosition(event.clientX, event.clientY);
    },
    [updatePinPosition],
  );

  const clearPin = useCallback(() => {
    setX(null);
    setY(null);
  }, [setX, setY]);

  const toggleShowOnHomepage = useCallback(() => {
    setShowOnHomepage(!showOnHomepage);
  }, [setShowOnHomepage, showOnHomepage]);

  return (
    <div
      style={{
        border: "1px solid var(--theme-elevation-150)",
        borderRadius: 16,
        marginBottom: 16,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "16px 16px 8px" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 12,
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600 }}>{heading}</div>
          <button
            onClick={toggleShowOnHomepage}
            style={{
              background: showOnHomepage
                ? "var(--theme-success-100)"
                : "var(--theme-elevation-100)",
              border: showOnHomepage
                ? "1px solid var(--theme-success-500)"
                : "1px solid var(--theme-elevation-200)",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 10px",
            }}
            type="button"
          >
            {showOnHomepage ? "Shown On Homepage" : "Show Pin On Homepage"}
          </button>
        </div>
        <p style={{ color: "var(--theme-elevation-700)", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
          Click anywhere on the map to place this trip&apos;s pin. Use the button to decide whether
          it should appear on the homepage map after you save.
        </p>
      </div>

      <button
        onClick={handleMapClick}
        ref={mapRef}
        style={{
          background: "#EEF6FA",
          border: 0,
          cursor: "crosshair",
          opacity: 1,
          display: "block",
          padding: 0,
          position: "relative",
          width: "100%",
        }}
        type="button"
      >
        <img
          alt="Trip destination map"
          src={imageSrc}
          style={{ display: "block", height: "auto", width: "100%" }}
        />
        {hasPin && (
          <div
            aria-hidden="true"
            style={{
              left: `${xValue}%`,
              pointerEvents: "none",
              position: "absolute",
              top: `${yValue}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: color.hex,
                border: "2px solid #fff",
                borderRadius: "999px 999px 999px 0",
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.18)",
                display: "flex",
                height: 24,
                justifyContent: "center",
                transform: "rotate(-45deg)",
                width: 24,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "999px",
                  height: 7,
                  transform: "rotate(45deg)",
                  width: 7,
                }}
              />
            </div>
          </div>
        )}
      </button>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ color: "var(--theme-elevation-700)", fontSize: 12, fontWeight: 600 }}>
            Pin Color
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {pinColors.map((option) => {
              const selected = option.value === color.value;

              return (
                <button
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  style={{
                    alignItems: "center",
                    background: selected ? "var(--theme-elevation-100)" : "transparent",
                    border: selected
                      ? "1px solid var(--theme-success-500)"
                      : "1px solid var(--theme-elevation-200)",
                    borderRadius: 999,
                    cursor: "pointer",
                    display: "flex",
                    gap: 8,
                    padding: "6px 10px",
                  }}
                  type="button"
                >
                  <span
                    style={{
                      background: option.hex,
                      borderRadius: "999px",
                      display: "inline-block",
                      height: 12,
                      width: 12,
                    }}
                  />
                  <span style={{ color: "var(--theme-text)", fontSize: 12 }}>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ alignItems: "flex-end", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ color: "var(--theme-elevation-700)", fontSize: 12 }}>
            {hasPin ? `X ${xValue}%  |  Y ${yValue}%` : "No pin placed yet"}
          </div>
          <button
            onClick={clearPin}
            style={{
              background: "transparent",
              border: "1px solid var(--theme-elevation-250)",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 12,
              padding: "6px 10px",
            }}
            type="button"
          >
            Clear Pin
          </button>
        </div>
      </div>
    </div>
  );
};
