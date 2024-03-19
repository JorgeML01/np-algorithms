import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';

const GrafoConClique = () => {
  const [nodesCount, setNodesCount] = useState(5);
  const [nodes, setNodes] = useState([]);
  const [cliques, setCliques] = useState([]);
  const [maxCliqueSize, setMaxCliqueSize] = useState(0);
  const [maxCliqueCount, setMaxCliqueCount] = useState(0); 
  const [progress, setProgress] = useState(0);
  const [iterations, setIterations] = useState(0);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    generateNodes(nodesCount);
  }, [nodesCount]);

  const handleNodesCountChange = (event) => {
    setNodesCount(parseInt(event.target.value, 10));
  };

  const generateNodes = (count) => {
    setNodes(Array.from({ length: count }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 400,
    })));
    setCliques([]);
    setMaxCliqueSize(0);
    setMaxCliqueCount(0);
    setIterations(0);
    setProgress(0);
  };

  const findCliques = () => {
    const startTime = performance.now();
    const newCliques = [];
    let newIterations = 0;
    let currentMaxCliqueSize = 0;
    let cliqueSizeCounts = new Map();

    const backtrack = (clique, candidates) => {
      newIterations++;
      if (candidates.length === 0) {
        if (clique.length > 0) {
          newCliques.push(clique);
          let count = cliqueSizeCounts.get(clique.length) || 0;
          cliqueSizeCounts.set(clique.length, count + 1);

          if (clique.length > currentMaxCliqueSize) {
            currentMaxCliqueSize = clique.length;
          }
        }
        return;
      }
      const node = candidates[0];
      const newCandidates = candidates.slice(1).filter((candidate) => isAdjacent(node, candidate));
      backtrack([...clique, node], newCandidates);
      backtrack(clique, candidates.slice(1));
    };

    backtrack([], nodes);
    const endTime = performance.now();
    const executionTime = (endTime - startTime) / 1000;
    const formattedTime = executionTime < 0.001 ? "Menos de un milisegundo" : executionTime.toFixed(3);
    setTimes([...times, { nodes: nodesCount, time: formattedTime, iterations: newIterations }]);
    setCliques(newCliques);
    setIterations(newIterations);
    setMaxCliqueSize(currentMaxCliqueSize);
    setMaxCliqueCount(cliqueSizeCounts.get(currentMaxCliqueSize) || 0);
    setProgress(100);
  };

  const isAdjacent = (node1, node2) => {
    return Math.hypot(node1.x - node2.x, node1.y - node2.y) < 50;
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(220);
    nodes.forEach((node, index) => {
      p5.fill(255);
      p5.circle(node.x, node.y, 20);
      p5.fill(0);
      p5.text(index + 1, node.x - 3, node.y + 4);
    });

    cliques.forEach((clique) => {
      clique.forEach((node, i) => {
        clique.slice(i + 1).forEach((target) => {
          p5.stroke(0);
          p5.line(node.x, node.y, target.x, target.y);
        });
      });
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', width: '100%' }}>
          <label style={{ marginRight: '1rem' }}>
            Cantidad de nodos:
            <input type="number" value={nodesCount} onChange={handleNodesCountChange} style={{ padding: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '5px', width: '70%' }} />
          </label>
          <button onClick={findCliques} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '0.5rem', transition: 'background-color 0.3s' }}>Encontrar Cliques</button>
          <button onClick={() => generateNodes(nodesCount)} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '0.5rem', transition: 'background-color 0.3s' }}>Reiniciar</button>
        </div>
        <div style={{ border: '1px solid #E5E7EB', borderRadius: '5px', marginBottom: '1rem', width: '100%', overflow: 'hidden' }}>
          <Sketch setup={setup} draw={draw} />
        </div>
        <progress value={progress} max="100" style={{ width: '100%', height: '20px', marginBottom: '1rem' }}></progress>
        <div style={{ color: '#1F2937', marginBottom: '1rem' }}>Iteraciones: {iterations}</div>
        <div style={{ color: '#1F2937', marginBottom: '1rem' }}>Tamaño máximo del clique: {maxCliqueSize}</div>
        <div style={{ color: '#1F2937', marginBottom: '1rem' }}>Repeticiones del clique máximo: {maxCliqueCount}</div>
        {times.length > 0 && (
          <table style={{ width: '100%', textAlign: 'left', marginBottom: '1rem' }}>
            <thead>
              <tr>
                <th>Nodos</th>
                <th>Tiempo (s)</th>
                <th>Iteraciones</th>
              </tr>
            </thead>
            <tbody>
              {times.map((record, index) => (
                <tr key={index}>
                  <td>{record.nodes}</td>
                  <td>{record.time}</td>
                  <td>{record.iterations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GrafoConClique;
