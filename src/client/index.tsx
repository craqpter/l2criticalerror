import "./styles.css";

import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import createGlobe from "cobe";
import usePartySocket from "partysocket/react";

// Message type from your server
import type { OutgoingMessage } from "../shared";
import type { LegacyRef } from "react";

// Country data with flags
const countryFlags: Record<string, string> = {
  'US': '🇺🇸', 'CA': '🇨🇦', 'MX': '🇲🇽', 'BR': '🇧🇷', 'AR': '🇦🇷', 'CL': '🇨🇱', 'CO': '🇨🇴', 'PE': '🇵🇪',
  'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱', 'BE': '🇧🇪', 'CH': '🇨🇭',
  'RU': '🇷🇺', 'PL': '🇵🇱', 'CZ': '🇨🇿', 'HU': '🇭🇺', 'RO': '🇷🇴', 'BG': '🇧🇬', 'HR': '🇭🇷', 'SI': '🇸🇮',
  'CN': '🇨🇳', 'JP': '🇯🇵', 'KR': '🇰🇷', 'IN': '🇮🇳', 'TH': '🇹🇭', 'VN': '🇻🇳', 'MY': '🇲🇾', 'SG': '🇸🇬',
  'AU': '🇦🇺', 'NZ': '🇳🇿', 'ZA': '🇿🇦', 'EG': '🇪🇬', 'NG': '🇳🇬', 'KE': '🇰🇪', 'MA': '🇲🇦', 'TN': '🇹🇳',
  'TR': '🇹🇷', 'IL': '🇮🇱', 'AE': '🇦🇪', 'SA': '🇸🇦', 'QA': '🇶🇦', 'KW': '🇰🇼', 'BH': '🇧🇭', 'OM': '🇴🇲'
};

const countryNames: Record<string, string> = {
  'US': 'United States', 'CA': 'Canada', 'MX': 'Mexico', 'BR': 'Brazil', 'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia', 'PE': 'Peru',
  'GB': 'United Kingdom', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands', 'BE': 'Belgium', 'CH': 'Switzerland',
  'RU': 'Russia', 'PL': 'Poland', 'CZ': 'Czech Republic', 'HU': 'Hungary', 'RO': 'Romania', 'BG': 'Bulgaria', 'HR': 'Croatia', 'SI': 'Slovenia',
  'CN': 'China', 'JP': 'Japan', 'KR': 'South Korea', 'IN': 'India', 'TH': 'Thailand', 'VN': 'Vietnam', 'MY': 'Malaysia', 'SG': 'Singapore',
  'AU': 'Australia', 'NZ': 'New Zealand', 'ZA': 'South Africa', 'EG': 'Egypt', 'NG': 'Nigeria', 'KE': 'Kenya', 'MA': 'Morocco', 'TN': 'Tunisia',
  'TR': 'Turkey', 'IL': 'Israel', 'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia', 'QA': 'Qatar', 'KW': 'Kuwait', 'BH': 'Bahrain', 'OM': 'Oman'
};

function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [counter, setCounter] = useState(0);
  const [countryStats, setCountryStats] = useState<Map<string, number>>(new Map());

  const positions = useRef<
    Map<
      string,
      {
        location: [number, number];
        size: number;
        country?: string;
      }
    >
  >(new Map());

  const socket = usePartySocket({
    room: "default",
    party: "globe",
    onMessage(evt) {
      const message = JSON.parse(evt.data as string) as OutgoingMessage;
      if (message.type === "add-marker") {
        positions.current.set(message.position.id, {
          location: [message.position.lat, message.position.lng],
          size: message.position.id === socket.id ? 0.1 : 0.05,
          country: message.position.country,
        });
        
        // Update country statistics
        if (message.position.country) {
          setCountryStats(prev => {
            const newStats = new Map(prev);
            const current = newStats.get(message.position.country) || 0;
            newStats.set(message.position.country, current + 1);
            return newStats;
          });
        }
        
        setCounter((c) => c + 1);
      } else {
        const position = positions.current.get(message.id);
        if (position?.country) {
          setCountryStats(prev => {
            const newStats = new Map(prev);
            const current = newStats.get(position.country) || 0;
            if (current > 1) {
              newStats.set(position.country, current - 1);
            } else {
              newStats.delete(position.country);
            }
            return newStats;
          });
        }
        positions.current.delete(message.id);
        setCounter((c) => Math.max(0, c - 1));
      }
    },
  });

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: 2,
      width: 400 * 2,
      height: 400 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 0.8,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.8, 0.1, 0.1],
      glowColor: [0.2, 0.2, 0.2],
      markers: [],
      opacity: 0.7,
      onRender: (state) => {
        state.markers = [...positions.current.values()];
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  // Sort countries by visitor count
  const sortedCountries = Array.from(countryStats.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10); // Show top 10 countries

  return (
    <section className="globe-container">
      <div className="globe-section">
        <h2>🌍 Where's everyone at?</h2>
        {counter > 0 ? (
          <p>
            <b>{counter}</b> {counter === 1 ? "person" : "people"} connected
          </p>
        ) : (
          <p>&nbsp;</p>
        )}

        <canvas
          ref={canvasRef as LegacyRef<HTMLCanvasElement>}
          style={{ width: 400, height: 400, maxWidth: "100%", aspectRatio: 1 }}
        />
      </div>

      <div className="stats-panel">
        <h3>📊 Global Statistics</h3>
        <div className="country-stats">
          {sortedCountries.length > 0 ? (
            <>
              {sortedCountries.map(([countryCode, count], index) => (
                <div key={countryCode} className="country-stat">
                  <span className="country-flag">{countryFlags[countryCode] || '🌍'}</span>
                  <span className="country-name">{countryNames[countryCode] || countryCode}</span>
                  <span className={`country-count ${index < 3 ? `top-${index + 1}` : ''}`}>
                    {count}
                  </span>
                </div>
              ))}
              {countryStats.size > 10 && (
                <div className="more-countries-indicator">
                  <span>+{countryStats.size - 10} more countries</span>
                </div>
              )}
            </>
          ) : (
            <p className="no-stats">No visitors yet</p>
          )}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="App">
      <header>
        <h1>✨ Lineage 2 CriticalError C4 ✨</h1>
        <p>Old-School C4 Private Server</p>
      </header>

      <section className="rates">
        <h2>📊 Server Rates</h2>
        <p>
          XP/SP: x10
          <br />
          Adena: x5
          <br />
          Drops/Spoil: x5
          <br />
          Quest Rewards: x2
          <br />
          Pet XP: x15
        </p>
        <p>Features: NpcBuffer • MasterClass • Craft XP</p>
        <a href="/server-info" className="server-info-link">
          📖 Read Full Server Description
        </a>
      </section>

      {/* 🔥 Globe inserted here */}
      <GlobeSection />

      <section className="links">
        <h2>🔗 Quick Links</h2>
        <a href="https://t.me/l2CriticalError" target="_blank">
          📢 Telegram Channel
        </a>
        <a href="https://t.me/lineage2c4bot" target="_blank">
          🤖 Registration Bot
        </a>
        <a href="https://instagram.com/l2criticalerror" target="_blank">
          📸 Instagram
        </a>
        <a href="https://drive.google.com/file/d/14LLNAB8eAZ3B7WUywC3U4159OkV9WpzZ/view?usp=sharing" target="_blank">
          📥 Download Client
        </a>
      </section>

      <footer>
        <p>
          Inspired by legendary Lineage 2 servers — Arax, Starnet, Moscow,
          L2Firebird, L2Reworld
        </p>
        <p>&copy; 2025 Lineage 2 CriticalError</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
