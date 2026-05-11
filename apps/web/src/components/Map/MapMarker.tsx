import L from "leaflet";

export type MarkerVariant = "kitchen" | "rider" | "destination";

const MARKER_CONFIGS: Record<MarkerVariant, { bg: string; border: string; shadow: string; iconSvg: string }> = {
  kitchen: {
    bg: "#d4af37",
    border: "#e8c547",
    shadow: "rgba(212, 175, 55, 0.5)",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.024a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.18.727.568.727 1.025V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg>`,
  },
  rider: {
    bg: "#3b82f6",
    border: "#60a5fa",
    shadow: "rgba(59, 130, 246, 0.5)",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>`,
  },
  destination: {
    bg: "#ef4444",
    border: "#f87171",
    shadow: "rgba(239, 68, 68, 0.5)",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  },
};

/**
 * Creates a custom Leaflet DivIcon styled for PlotKitch.
 */
export function createMarkerIcon(variant: MarkerVariant, size: number = 44): L.DivIcon {
  const config = MARKER_CONFIGS[variant];
  const isRider = variant === "rider";

  const html = `
    <div style="
      position: relative;
      width: ${size}px;
      height: ${size}px;
    ">
      ${isRider ? `<div class="rider-marker-pulse"></div>` : ""}
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${config.bg};
        border: 2.5px solid ${config.border};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px ${config.shadow}, 0 0 0 4px ${config.shadow.replace("0.5", "0.15")};
        position: relative;
        z-index: 2;
        ${isRider ? "animation: none;" : ""}
      ">
        ${config.iconSvg}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: `${isRider ? "rider-marker-icon" : ""} plotkitch-marker`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
    tooltipAnchor: [0, -(size / 2 + 4)],
  });
}
