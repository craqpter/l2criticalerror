import "./styles.css";

import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import createGlobe from "cobe";
import usePartySocket from "partysocket/react";

// Message type from your server
import type { OutgoingMessage } from "../shared";
import type { LegacyRef } from "react";

function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [counter, setCounter] = useState(0);

  const positions = useRef<
    Map<
      string,
      {
        location: [number, number];
        size: number;
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
        });
        setCounter((c) => c + 1);
      } else {
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

  return (
    <section className="globe">
      <h2>🌍 Where’s everyone at?</h2>
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
        <a href="#">📥 Download Patch</a>
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
