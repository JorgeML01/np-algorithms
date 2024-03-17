

import React, { useState } from "react";
import Sketch from "react-p5";
import Button from "react-bootstrap/Button";
import './style.css';

const ColoracionGrafos = () => {
  const [nodes, setNodes] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorCount, setColorCount] = useState(3);
  const [executionTime, setExecutionTime] = useState(null);
  const [coloringSuccessful, setColoringSuccessful] = useState(true);
  const [uncoloredNode, setUncoloredNode] = useState(null);
  const [uncoloredNodes, setUncoloredNodes] = useState([]);

  const V = nodes.length;
  let color;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(700, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(220);

    nodes.forEach((node, index) => {
      const nodeColor = colors[index];

      if (nodeColor) {
        p5.fill(p5.color(nodeColor.r, nodeColor.g, nodeColor.b));
        p5.circle(node.x, node.y, 20);
      } else {
        p5.fill(200, 200, 200);
        p5.circle(node.x, node.y, 20);
      }
    });

    selectedNodes.forEach((nodeIndex, i) => {
      if (i < selectedNodes.length - 1) {
        const node1 = nodes[selectedNodes[i]];
        const node2 = nodes[selectedNodes[i + 1]];
        p5.strokeWeight(2);
        p5.line(node1.x, node1.y, node2.x, node2.y);
      }
    });
  };

  const mouseClicked = (p5) => {
    if (
      p5.mouseX > 0 &&
      p5.mouseX < p5.width &&
      p5.mouseY > 0 &&
      p5.mouseY < p5.height
    ) {
      const selected = nodes.findIndex((node) => {
        const distance = p5.dist(node.x, node.y, p5.mouseX, p5.mouseY);
        return distance < 10;
      });

      if (selected !== -1) {
        setSelectedNodes([...selectedNodes, selected]);
      } else {
        setNodes([...nodes, { x: p5.mouseX, y: p5.mouseY }]);
        setColors([...colors, { r: 255, g: 255, b: 255 }]);
      }
    }
  };

  const handleColorearClick = () => {
    const iterations = 10000;
    const startTimes = [];
    const endTimes = [];

    for (let i = 0; i < iterations; i++) {
      startTimes.push(performance.now());

      const graph = createAdjacencyMatrix(nodes, selectedNodes);
      color = new Array(V).fill(0);
      setUncoloredNodes((prevUncoloredNodes) => []); 

      for (let i = 0; i < V; i++) {
        let availableColors = new Array(colorCount).fill(true);

        for (let j = 0; j < V; j++) {
          if (graph[i][j] && color[j]) {
            availableColors[color[j] - 1] = false;
          }
        }

        let assigned = false;
        for (let c = 0; c < colorCount; c++) {
          if (availableColors[c]) {
            color[i] = c + 1;
            assigned = true;
            break;
          }
        }

        if (!assigned) {
          setColoringSuccessful(false);
          setUncoloredNodes((prevUncoloredNodes) => [...prevUncoloredNodes, i]);
        }
      }

      const defaultColors = [
        { r: 255, g: 0, b: 0 }, 
        { r: 0, g: 0, b: 255 }, 
        { r: 255, g: 255, b: 0 },
        { r: 0, g: 255, b: 0 }, 
      ];

      const defaultColor = { r: 255, g: 255, b: 255 }; 

      setColors(color.map((c) => (c ? defaultColors[c - 1] : defaultColor)));

      endTimes.push(performance.now());
    }

    const totalTime = endTimes[iterations - 1] - startTimes[0];
    const averageTime = totalTime / iterations;
    setExecutionTime(averageTime);
  };

  const createAdjacencyMatrix = (nodes, selectedNodes) => {
    const graph = Array.from({ length: V }, () => Array(V).fill(0));

    selectedNodes.forEach((nodeIndex, i) => {
      if (i < selectedNodes.length - 1) {
        graph[nodeIndex][selectedNodes[i + 1]] = 1;
        graph[selectedNodes[i + 1]][nodeIndex] = 1;
      }
    });

    return graph;
  };

  const handleLimpiarClick = () => {
    setNodes([]);
    setSelectedNodes([]);
    setColors([]);
    setColorCount(3);
    setExecutionTime(null);
    setColoringSuccessful(true);
    setUncoloredNode(null);
    setUncoloredNodes([]);
  };


  const styleContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    width: "49rem",
    marginLeft: "30rem", 
    marginTop: "6rem", 
  };

  const styleButton = {
    margin: "10px",
    padding: "8px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  };

  const styleInput = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "calc(100% - 22px)", 
  };

  const styleSketch = {
    marginTop: "20px",
  };

  const styleInfoText = {
    marginTop: "10px",
  };

  const styleWarningText = {
    color: "red",
    marginTop: "10px",
  };

  return (
    <div style={styleContainer}>
      <h4>Coloración de grafos</h4>
      <label>
        Cantidad de colores:
        <input
          type="number"
          value={colorCount}
          onChange={(event) => setColorCount(Number(event.target.value))}
          style={styleInput}
        />
      </label>
      <div style={styleSketch}>
        <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      </div>
      <div>
        <Button
          variant="outline-success"
          onClick={handleLimpiarClick}
          style={{ ...styleButton, marginRight: "10px" }}
        >
          Limpiar
        </Button>
        <Button
          variant="outline-success"
          onClick={handleColorearClick}
          style={{ ...styleButton, marginLeft: "10px" }}
        >
          Colorear
        </Button>
      </div>
      {executionTime !== null && (
        <p style={styleInfoText}>
          Tiempo de ejecución promedio: {executionTime.toFixed(4)} milisegundos
        </p>
      )}
      {!coloringSuccessful && uncoloredNodes.length > 0 && (
        <p style={styleWarningText}>
          No se pudo colorear el grafo. {uncoloredNodes.length} nodo(s) no
          pudo(ieron) ser coloreado(s).
        </p>
      )}
    </div>
  );
};

export default ColoracionGrafos;

