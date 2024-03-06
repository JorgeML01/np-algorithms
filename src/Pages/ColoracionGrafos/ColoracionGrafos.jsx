import React, { useState } from "react";
import Sketch from "react-p5";

const ColoracionGrafos = () => {
  const [nodes, setNodes] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [colors, setColors] = useState([]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(220);
  
    // Dibujar nodos
    nodes.forEach((node, index) => {
      const color = colors[index]; // Usar el valor del color
      if (color !== null) {
        p5.fill(p5.color(color.r, color.g, color.b));
      } else {
        p5.fill(255); // Los nodos sin color se pintan de blanco
      }
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
        setColors([...colors, null]); // Los nodos nuevos no tienen color
      }
    }
  };

  const handleColorearClick = () => {
    // Colorear nodos
    const newColors = Array(nodes.length).fill(0).map(() => ({
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    }));
  
    setColors(newColors);
  };

  const areNodesAdjacent = (node1, node2) => {
    const distance = Math.sqrt(
      Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
    );
    return distance < 50;
  };

  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
    <button onClick={handleColorearClick} style={{ marginTop: '20px' }}>Colorear</button>
  </div>
);
};

export default ColoracionGrafos;
