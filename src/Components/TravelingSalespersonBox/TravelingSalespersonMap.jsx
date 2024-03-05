import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

function factorialRecursivo(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorialRecursivo(n - 1);
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    sum += d;
  }
  return sum;
}

function dist(x0, y0, x1, y1) {
  return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
}

export default function TravelingSalespersonMap(props) {

    let setupOnce = 0;

    const [totalCities, setTotalCities] = useState(props.totalCities);
    let cities = [];
    let totalTimes = [];
    let totalDistances = [];
    let recordDistance;
    let bestEver;
    let iterationNumber = 0;
    let max = factorialRecursivo(totalCities);
    const startTime = performance.now();
    let totalTime = 0;
    let endTime = 0;
    let backgroundImage;

    useEffect(() => {
        setTotalCities(props.totalCities);
    }, [props.totalCities]);

    function preload(p5) {
        backgroundImage = p5.loadImage("/honduras-map.jpg"); // Asegúrate de que la ruta sea correcta
    }

    function setup(p5, canvasParentRef) {
        if (setupOnce === 0) {
            p5.createCanvas(487, 333).parent(canvasParentRef);
            
            // Ubicaciones de cada ciudad.
            const nodeCoordinates = [
                { x: 165, y: 242 },
                { x: 109, y: 126 },
                { x: 195, y: 110 },
                { x: 167, y: 302 },
                { x: 48,  y: 187 },
                { x: 427, y: 145 },
                { x: 266, y: 98 },
            ];

            for (let i = 0; i < 7; i++) {
                // Utiliza las coordenadas específicas en lugar de posiciones aleatorias
                let v = p5.createVector(nodeCoordinates[i].x, nodeCoordinates[i].y);
                cities[i] = v;
            }

            let d = calcDistance(cities);
            recordDistance = d;
            bestEver = cities.slice();
            setupOnce++;
        } else {
            // No fue la mejor solución pero ya no se repite el canvas.
            p5.createCanvas(0, 0).parent(canvasParentRef);
        }
    }

    function draw(p5) {
        if (!backgroundImage) return; 

        p5.background(0);
        p5.image(backgroundImage, 0, 0, p5.width, p5.height);
        p5.stroke(255);
        p5.strokeWeight(1);
        p5.noFill();

        p5.beginShape();
        for (let i = 0; i < cities.length; i++) {
            p5.vertex(cities[i].x, cities[i].y);
        }
        p5.endShape();

        p5.stroke(255, 0, 255);
        p5.strokeWeight(4);
        p5.noFill();
        p5.beginShape();

        for (let i = 0; i < cities.length; i++) {
            p5.vertex(bestEver[i].x, bestEver[i].y);
        }
        if (iterationNumber < max) {
            console.log(iterationNumber);
            iterationNumber++;
        } else if (iterationNumber === max) {
            console.log("Mejor distancia: " + recordDistance);
            console.log("Tiempo tomado para la mejor ruta: " + totalTime/1000);
            console.log("Total distances: " + totalDistances);
            console.log("Total times: " + totalTimes);
        }
        p5.endShape();

        var i = p5.floor(p5.random(cities.length));
        var j = p5.floor(p5.random(cities.length));

        if (iterationNumber < max) {
            swap(cities, i, j);
        }

        var d = calcDistance(cities);
        if (d < recordDistance) {
            recordDistance = d;
            bestEver = cities.slice();
            console.log(recordDistance);
            endTime = performance.now();
            totalTime = endTime - startTime;
            totalTimes.push(totalTime / 1000);
            totalDistances.push(recordDistance);
        }


        p5.fill(0, 0, 0);
        p5.stroke(255);
        p5.textSize(14);
        p5.text("Iteration: " + iterationNumber, 10, 30);
        p5.text("Percentage: " + Math.round((iterationNumber / max) * 100) + "%", 10, 70);
        p5.text("Tiempo tomado para la mejor ruta: " + totalTime/1000 + " segundos", 10, 50);
        p5.text("Mejor distancia: " + recordDistance);

  }

  return (
    <div>
      <h4>Honduras map example</h4>
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
}
