// ...existing code...
import { useState } from "react";
import { runSimulation } from "./api/spiderApi";
import type { Orientation, SimulationResponse } from "./api/spiderApi";
import "./App.css";

export default function App() {
  const [wallMaxX, setWallMaxX] = useState(7);
  const [wallMaxY, setWallMaxY] = useState(15);
  const [startX, setStartX] = useState(4);
  const [startY, setStartY] = useState(10);
  const [startOrientation, setStartOrientation] = useState<Orientation>("Left");
  const [instructions, setInstructions] = useState("FLFLFRFFLF");

  const [result, setResult] = useState<SimulationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onRun = async () => {
    setError(null);
    setResult(null);

    try {
      const response = await runSimulation({
        wallMaxX,
        wallMaxY,
        startX,
        startY,
        startOrientation,
        instructions
      });

      setResult(response);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error.");
    }
  };

  return (
    <main className="app">
      <h1>Spider Simulator</h1>

      <fieldset>
        <legend>Wall Size</legend>
        <label htmlFor="wallMaxX">Max X</label>
        <input id="wallMaxX" type="number" value={wallMaxX} onChange={(e) => setWallMaxX(Number(e.target.value))} />
        <label htmlFor="wallMaxY">Max Y</label>
        <input id="wallMaxY" type="number" value={wallMaxY} onChange={(e) => setWallMaxY(Number(e.target.value))} />
      </fieldset>

      <fieldset>
        <legend>Starting Position</legend>
        <label htmlFor="startX">Start X</label>
        <input id="startX" type="number" value={startX} onChange={(e) => setStartX(Number(e.target.value))} />
        <label htmlFor="startY">Start Y</label>
        <input id="startY" type="number" value={startY} onChange={(e) => setStartY(Number(e.target.value))} />
        <label htmlFor="startOrientation">Orientation</label>
        <select id="startOrientation" value={startOrientation} onChange={(e) => setStartOrientation(e.target.value as Orientation)}>
          {["Up", "Right", "Down", "Left"].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <legend>Instructions</legend>
        <label htmlFor="instructions">Movement Instructions</label>
        <input id="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      </fieldset>

      <button onClick={onRun}>Run Simulation</button>

      {result && (
        <p>Result: {result.x} {result.y} {result.orientation}</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}
    </main>
  );
}
// ...existing code...