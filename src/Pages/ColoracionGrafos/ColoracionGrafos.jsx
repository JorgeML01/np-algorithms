import React, { useEffect } from "react";
import Sketch from "react-p5";

export default function ColoracionGrafos(props) {
  let color = [];
  let V = 5;
  let graph = [
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
  ];

  const isSafe = (v, graph, color, c) => {
    for (let i = 0; i < V; i++)
      if (graph[v][i] === 1 && c === color[i]) return false;
    return true;
  };

  const graphColoringUtil = (graph, m, color, v) => {
    if (v === V) return true;

    for (let c = 1; c <= m; c++) {
      if (isSafe(v, graph, color, c)) {
        color[v] = c;

        if (graphColoringUtil(graph, m, color, v + 1)) return true;

        color[v] = 0;
      }
    }

    return false;
  };

  const graphColoring = (graph, m) => {
    color = new Array(V).fill(0);

    if (!graphColoringUtil(graph, m, color, 0)) {
      console.log("Solution does not exist");
      return false;
    }

    printSolution(color);
    return true;
  };

  const printSolution = (color) => {
    console.log("Solution Exists: Following are the assigned colors");
    for (let i = 0; i < V; i++) console.log(" " + color[i] + " ");
  };

  useEffect(() => {
    // Test whether the graph is 3 colorable
    const m = 3; // Number of colors
    graphColoring(graph, m);
  }, []);

  const setup = (p5, parent) => {
    p5.createCanvas(400, 400).parent(parent);
  };

  const draw = (p5) => {
    p5.background(255); // Limpiar el lienzo
  
    const nodeRadius = 30;
    const xOffset = p5.width / 2;
    const yOffset = p5.height / 2;
    const radius = Math.min(p5.width, p5.height) / 2 - nodeRadius;
  
    const nodePositions = [];
  
    // Calcular las posiciones de los nodos
    for (let i = 0; i < V; i++) {
      const angle = (i / V) * p5.TWO_PI;
      const x = xOffset + Math.cos(angle) * radius;
      const y = yOffset + Math.sin(angle) * radius;
      nodePositions.push({ x, y });
    }
  
    // Dibujar aristas
    for (let i = 0; i < V; i++) {
      const x1 = nodePositions[i].x;
      const y1 = nodePositions[i].y;
  
      for (let j = 0; j < V; j++) {
        if (graph[i][j] === 1) {
          const x2 = nodePositions[j].x;
          const y2 = nodePositions[j].y;
  
          p5.stroke(0);
          p5.line(x1, y1, x2, y2);
        }
      }
    }
  
    // Dibujar nodos y colorearlos según el array 'color'
    for (let i = 0; i < V; i++) {
      const x = nodePositions[i].x;
      const y = nodePositions[i].y;
  
      // Default color es rojo
      let nodeColor = p5.color(255, 0, 0);
  
      if (color[i] === 1) {
        // Cambiar color a verde
        nodeColor = p5.color(0, 255, 0);
      } else if (color[i] === 2) {
        // Cambiar color a azul
        nodeColor = p5.color(0, 0, 255);
      }
  
      p5.fill(nodeColor);
      p5.ellipse(x, y, nodeRadius, nodeRadius);
    }
  };
  

  return <Sketch setup={setup} draw={draw} />;
}
