import React, { useState } from "react";

import { SIZE, ROWS, COLUMNS } from "../../constants";
import "./styles.css";
import "../../tiles.css";

const tiles = [
  "grass",
  "plant-2",
  "plant-1",
  "flowers-2",
  "flowers-4",
  "log-1",
  "log-2",
  "rock-1",
  "rock-2"
];

const MapBuilder = () => {
  const [placedTiles, setPlacedTiles] = useState([]);
  const placeTile = (tile, x, y) => {
    console.log({ tile, x, y });
    const snappedX = Math.ceil(x / 32) * 32 - 32;
    const snappedY = Math.ceil(y / 32) * 32 - 32;
    setPlacedTiles(prevState => [
      ...prevState.filter(prev => !(prev.x === snappedX && prev.y === snappedY)),
      { tile, x: snappedX, y: snappedY }
    ]);
  };
  const handleDrag = e => {
    e.dataTransfer.setData("text", e.target.id);
  };
  const handleDrop = e => {
    e.preventDefault();
    const tile = e.dataTransfer.getData("text").split("_")[0];
    placeTile(tile, e.clientX, e.clientY);
  };
  const onDragOver = e => e.preventDefault();

  return (
    <div className="map-builder">
      <div
        className="map"
        onDragOver={onDragOver}
        onDrop={handleDrop}
        style={{ width: SIZE * ROWS + 1, height: SIZE * COLUMNS + 1 }}
      >
        {placedTiles.map((placed, i) => (
          <div
            key={i}
            className={`placed tile ${placed.tile}`}
            style={{ left: placed.x, top: placed.y }}
          ></div>
        ))}
      </div>
      <div className="tiles">
        {tiles.map((tile, i) => (
          <div
            className={`tile ${tile}`}
            draggable={true}
            onDragStart={handleDrag}
            id={`${tile}_${i}`}
            key={`${tile}_${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MapBuilder;
