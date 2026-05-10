'use client';

import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const markers = [
  { id: "malta", name: "Malta", desc: "Central Governance Node", flag: "🇲🇹", coordinates: [14.5146, 35.8989] as [number, number] },
  { id: "rwanda", name: "Kigali", desc: "Sustainable Tech Hub", flag: "🇷🇼", coordinates: [30.0619, -1.9441] as [number, number] },
  { id: "canada", name: "Vancouver", desc: "Network Theory Lab", flag: "🇨🇦", coordinates: [-123.1207, 49.2827] as [number, number] },
  { id: "malaysia", name: "Cyberjaya", desc: "Digital Governance Node", flag: "🇲🇾", coordinates: [101.6558, 2.9224] as [number, number] },
  { id: "iceland", name: "Reykjavik", desc: "Arctic Research Hub", flag: "🇮🇸", coordinates: [-21.9426, 64.1466] as [number, number] },
  { id: "japan", name: "Tokyo", desc: "Pacific Robotics Node", flag: "🇯🇵", coordinates: [139.6917, 35.6895] as [number, number] },
  { id: "australia", name: "Sydney", desc: "Oceania Research Hub", flag: "🇦🇺", coordinates: [151.2093, -33.8688] as [number, number] },
  { id: "germany", name: "Berlin", desc: "Euro-Core Node", flag: "🇩🇪", coordinates: [13.4050, 52.5200] as [number, number] },
  { id: "argentina", name: "Buenos Aires", desc: "Agro-Innovation Hub", flag: "🇦🇷", coordinates: [-58.3816, -34.6037] as [number, number] },
  { id: "nigeria", name: "Lagos", desc: "Creative Economy Hub", flag: "🇳🇬", coordinates: [3.3792, 6.5244] as [number, number] },
  { id: "egypt", name: "Cairo", desc: "History & Tech Hub", flag: "🇪🇬", coordinates: [31.2357, 30.0444] as [number, number] },
  { id: "kenya", name: "Nairobi", desc: "Silicon Savannah Node", flag: "🇰🇪", coordinates: [36.8219, -1.2921] as [number, number] },
  { id: "southafrica", name: "Cape Town", desc: "Energy Sovereignty Lab", flag: "🇿🇦", coordinates: [18.4241, -33.9249] as [number, number] },
  { id: "ethiopia", name: "Addis Ababa", desc: "Diplomatic Data Node", flag: "🇪🇹", coordinates: [38.74, 9.03] as [number, number] },
  { id: "ghana", name: "Accra", desc: "Digital Trade Node", flag: "🇬🇭", coordinates: [-0.1870, 5.6037] as [number, number] },
  { id: "senegal", name: "Dakar", desc: "Francophone Tech Hub", flag: "🇸🇳", coordinates: [-17.4467, 14.6928] as [number, number] },
  { id: "morocco", name: "Casablanca", desc: "Maghreb Finance Node", flag: "🇲🇦", coordinates: [-7.5898, 33.5731] as [number, number] },
  { id: "angola", name: "Luanda", desc: "Oceanic Resource Lab", flag: "🇦🇴", coordinates: [13.2344, -8.8390] as [number, number] },
  { id: "india", name: "Mumbai", desc: "Indus-Valley Lab", flag: "🇮🇳", coordinates: [72.8777, 19.0760] as [number, number] },
  { id: "uk", name: "London", desc: "Financial Ethics Node", flag: "🇬🇧", coordinates: [-0.1276, 51.5074] as [number, number] },
  { id: "usa", name: "San Francisco", desc: "Silicon Tech Hub", flag: "🇺🇸", coordinates: [-122.4194, 37.7749] as [number, number] },
  { id: "france", name: "Paris", desc: "Cultural Synthesis Node", flag: "🇫🇷", coordinates: [2.3522, 48.8566] as [number, number] },
  { id: "netherlands", name: "Amsterdam", desc: "Logistics Framework Node", flag: "🇳🇱", coordinates: [4.9041, 52.3676] as [number, number] },
  { id: "pakistan", name: "Islamabad", desc: "Regional Scaling Lab", flag: "🇵🇰", coordinates: [73.0479, 33.6844] as [number, number] },
  { id: "singapore", name: "Singapore", desc: "Smart Infrastructure Node", flag: "🇸🇬", coordinates: [103.8198, 1.3521] as [number, number] },
  { id: "uae", name: "Dubai", desc: "Desert Engineering Hub", flag: "🇦🇪", coordinates: [55.2708, 25.2048] as [number, number] },
  { id: "seoul", name: "Seoul", desc: "Bio-Infrstructure Node", flag: "🇰🇷", coordinates: [126.9780, 37.5665] as [number, number] },
  { id: "brazil", name: "Manaus", desc: "Amazonian Bio-Guard", flag: "🇧🇷", coordinates: [-60.0217, -3.1190] as [number, number] },
  { id: "mexico", name: "Mexico City", desc: "Social Resilience Node", flag: "🇲🇽", coordinates: [-99.1332, 19.4326] as [number, number] },
  { id: "newzealand", name: "Auckland", desc: "Southern Oceanic Lab", flag: "🇳🇿", coordinates: [174.7633, -36.8485] as [number, number] }
];

const ArtemisMap = () => {
  return (
    <div className="w-full relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <ComposableMap
        projectionConfig={{ scale: 160, center: [10, 0] }}
        width={800}
        height={450}
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="0.8" fill="#D1D5DB" />
          </pattern>
        </defs>

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="url(#dot-pattern)"
                stroke="transparent"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#9CA3AF" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        
        {markers.map((marker) => (
          <Marker 
            key={marker.id} 
            coordinates={marker.coordinates}
          >
            <g className="group/marker">
              {/* Pin Base */}
              <circle 
                r="8" 
                fill="white" 
                stroke="#E5E7EB"
                strokeWidth="0.5"
                style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.1))' }}
              />
              <text 
                textAnchor="middle" 
                y="3.5" 
                style={{ fontSize: '10px', pointerEvents: 'none' }}
              >
                {marker.flag}
              </text>
              
              {/* Persistent Labels */}
              <g transform="translate(12, -4)">
                {/* Background for text legibility */}
                <rect 
                  x="-2" 
                  y="-10" 
                  width={marker.name.length * 6 + 10} 
                  height="12" 
                  rx="4" 
                  fill="rgba(255,255,255,0.7)" 
                  className="backdrop-blur-sm"
                />
                <text
                  x="0"
                  y="0"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '8px',
                    fontWeight: 'bold',
                    fill: '#141414',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    pointerEvents: 'none'
                  }}
                >
                  {marker.name}
                </text>
                <text
                  x="0"
                  y="8"
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: '6px',
                    fill: '#6B7280',
                    fontWeight: '500',
                    pointerEvents: 'none'
                  }}
                >
                  {marker.desc}
                </text>
              </g>

              {/* Hover effect ring */}
              <circle 
                r="10" 
                fill="none" 
                stroke="#8A0000" 
                strokeWidth="1" 
                className="opacity-0 group-hover/marker:opacity-100 transition-all duration-300"
              />
            </g>
          </Marker>
        ))}
      </ComposableMap>

      <Tooltip 
        id="map-tooltip" 
        className="!bg-[#141414] !text-white !text-[10px] !font-bold !uppercase !tracking-widest !rounded-md !px-3 !py-1 !shadow-xl z-[9999]"
      />
    </div>
  );
};

export default memo(ArtemisMap);
