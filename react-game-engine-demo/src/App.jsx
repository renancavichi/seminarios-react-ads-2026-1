import React from "react";
import { GameEngine } from "react-game-engine";
import {
  Player,
  Coin,
  OrangeCircle,
  Score,
  StatusMessage,
} from "./renderers.jsx";
import { MoveAndCollect } from "./systems.js";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

export default function App() {
  return (
    <main className="page">
      <section className="presentation">
        <h1>React Game Engine</h1>

        <p>
          Clique na área cinza para mover o jogador azul. Pegue a moeda amarela
          para ganhar pontos. Evite os círculos laranja: se encostar neles, você
          perde. A moeda e os obstáculos mudam de posição constantemente.
        </p>
      </section>

      <GameEngine
        className="game-area"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
        }}
        systems={[MoveAndCollect]}
        entities={{
          game: {
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            isGameOver: false,
            hasSpawnedInitialObjects: false,
          },

          player: {
            x: 100,
            y: 100,
            size: 50,
            renderer: <Player />,
          },

          coin: {
            x: 400,
            y: 250,
            size: 40,
            frameCounter: 0,
            moveIntervalFrames: 90,
            renderer: <Coin />,
          },

          danger1: {
            x: 200,
            y: 150,
            size: 40,
            renderer: <OrangeCircle />,
          },

          danger2: {
            x: 500,
            y: 180,
            size: 40,
            renderer: <OrangeCircle />,
          },

          danger3: {
            x: 350,
            y: 380,
            size: 40,
            renderer: <OrangeCircle />,
          },

          score: {
            value: 0,
            renderer: <Score />,
          },

          status: {
            visible: false,
            message: "",
            renderer: <StatusMessage />,
          },
        }}
      />
    </main>
  );
}