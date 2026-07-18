"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export interface Gate {
  id: string;
  name: string;
  zone_id: string;
  latitude: number;
  longitude: number;
  accessible: boolean;
  status: string;
}

const STADIUM_CENTER: [number, number] = [40.8128, -74.0742];

export default function MapView({ gates }: { gates: Gate[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map(containerRef.current, {
        zoomControl: false,
      }).setView(STADIUM_CENTER, 16);

      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }).addTo(map);

      gates.forEach((g) => {
        const color =
          g.status === "congested"
            ? "#ef4444"
            : g.accessible
            ? "#10b981"
            : "#f5b700";

        const emoji =
          g.status === "congested"
            ? "🚨"
            : g.accessible
            ? "♿"
            : "⚽";

        const icon = L.divIcon({
          html: `
            <div
              style="
                background:${color};
                width:36px;
                height:36px;
                border-radius:9999px;
                display:flex;
                justify-content:center;
                align-items:center;
                color:white;
                font-size:18px;
                border:3px solid white;
                box-shadow:0 8px 20px rgba(0,0,0,.35);
              "
            >
              ${emoji}
            </div>
          `,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        L.marker([g.latitude, g.longitude], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width:180px">
              <h3 style="font-weight:700;margin-bottom:8px">
                ${g.name}
              </h3>

              <p><strong>Status:</strong> ${g.status}</p>

              <p><strong>Accessible:</strong> ${
                g.accessible ? "Yes" : "No"
              }</p>

              <p><strong>Zone:</strong> ${g.zone_id}</p>
            </div>
          `);
      });
    })();

    return () => {
      cancelled = true;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [gates]);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            🗺️ Stadium Live Map
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Real-time monitoring of entrances and crowd movement.
          </p>

        </div>

        <span className="rounded-full bg-yellow-400/20 px-4 py-2 text-sm font-semibold text-yellow-300">
          LIVE
        </span>

      </div>

      {/* Map */}

      <div
        ref={containerRef}
        className="h-[500px] w-full"
      />

      {/* Footer */}

      <div className="flex flex-wrap gap-5 border-t border-white/10 p-5 text-sm">

        <div className="flex items-center gap-2">
          <span className="text-xl">⚽</span>
          Normal Gate
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl">🚨</span>
          Congested
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl">♿</span>
          Accessible
        </div>

      </div>

    </div>
  );
}