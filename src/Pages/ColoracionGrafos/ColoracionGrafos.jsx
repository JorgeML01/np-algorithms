import React, { useState } from "react";
import Sketch from "react-p5";

const ColoracionGrafos = () => {
  const [nodes, setNodes] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorCount, setColorCount] = useState(3); // Puedes cambiar el valor inicial según tus necesidades

  const handleColorCountChange = (event) => {
    setColorCount(Number(event.target.value));
  };

  const V = nodes.length;
  let color;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(220);

    // Dibujar nodos
    nodes.forEach((node, index) => {
      const nodeColor = colors[index];
      p5.fill(p5.color(nodeColor.r, nodeColor.g, nodeColor.b));
      p5.circle(node.x, node.y, 20);
    });

    // Dibujar líneas entre nodos seleccionados
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
    // Comprobar si el clic del ratón está dentro del lienzo
    if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height) {
      // Seleccionar nodo si se hace clic en un nodo existente
      const selected = nodes.findIndex((node) => {
        const distance = p5.dist(node.x, node.y, p5.mouseX, p5.mouseY);
        return distance < 10;
      });

      if (selected !== -1) {
        setSelectedNodes([...selectedNodes, selected]);
      } else {
        // Agregar nodo si no se hace clic en un nodo existente
        setNodes([...nodes, { x: p5.mouseX, y: p5.mouseY }]);
        setColors([...colors, { r: 255, g: 255, b: 255 }]);
      }
    }
  };

  const handleColorearClick = () => {
    const graph = createAdjacencyMatrix(nodes, selectedNodes);

    // Inicializar colores
    color = new Array(V).fill(0);

    // Asignar colores según reglas específicas
    for (let i = 0; i < V; i++) {
      let availableColors = new Array(colorCount).fill(true); // Colores disponibles

      // Marcar los colores de los nodos adyacentes como no disponibles
      for (let j = 0; j < V; j++) {
        if (graph[i][j] && color[j]) {
          availableColors[color[j] - 1] = false;
        }
      }

      // Asignar el primer color disponible
      let assigned = false;
      for (let c = 0; c < colorCount; c++) {
        if (availableColors[c]) {
          color[i] = c + 1;
          assigned = true;
          break;
        }
      }

      // Si no se pudo asignar un color, mostrar un mensaje de error
      if (!assigned) {
        alert('No es posible colorear el grafo con la cantidad de colores proporcionada.');
        return;
      }
    }

    // Pregenerar una lista de colores
    const pregeneratedColors = Array.from({ length: colorCount }, () => ({ r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256) }));

    // Actualizar el estado de colores
    setColors(color.map((c) => pregeneratedColors[c - 1]));
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
       <label>
      Cantidad de colores:
      <input type="number" value={colorCount} onChange={handleColorCountChange} />
    </label>
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      <button onClick={handleColorearClick} style={{ marginTop: '20px' }}>Colorear</button>
    </div>
  );
};

export default ColoracionGrafos;
