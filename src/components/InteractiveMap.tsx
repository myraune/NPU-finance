"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "./ThemeProvider";

const NPU_LAT = 41.9836;
const NPU_LNG = -87.7236;

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up previous map instance when theme changes
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
      center: [NPU_LAT, NPU_LNG],
      zoom: 15,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false,
    });

    const tileStyle = theme === "light" ? "light_all" : "dark_all";
    L.tileLayer(`https://{s}.basemaps.cartocdn.com/${tileStyle}/{z}/{x}/{y}{r}.png`, {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    const accentColor = theme === "light" ? "#b8922e" : "#d4a843";
    const baseColor = theme === "light" ? "#f5f2ed" : "#06090f";
    const textColor = theme === "light" ? "#5a544c" : "#a0a4b0";

    const goldIcon = L.divIcon({
      className: "",
      html: `
        <div style="
          width: 18px; height: 18px;
          background: ${accentColor};
          border: 2px solid ${baseColor};
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(212, 168, 67, 0.5), 0 0 24px rgba(212, 168, 67, 0.2);
        "></div>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -12],
    });

    L.marker([NPU_LAT, NPU_LNG], { icon: goldIcon })
      .addTo(map)
      .bindPopup(
        `<div style="font-family: system-ui, sans-serif; padding: 4px 0;">
          <p style="color: ${accentColor}; font-size: 13px; font-weight: 600; margin: 0 0 4px;">North Park University</p>
          <p style="color: ${textColor}; font-size: 11px; margin: 0;">3225 W Foster Ave<br/>Chicago, IL 60625</p>
        </div>`,
        { closeButton: false, className: "dark-popup" }
      );

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [theme]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-2xl overflow-hidden border border-border-subtle"
    />
  );
}
