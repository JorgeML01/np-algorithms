import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import {factorialRecursivo, calcDistance, swap} from "./functions.js";


export default function TravelingSalespersonMap(props) {

    let setupOnce = 0;

    const [totalCities, setTotalCities] = useState(props.totalCities);
    
    let cities = [];
    let totalTimes = [];
    let totalDistances = [];
    let cityAdded = [];
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
                { x: 242, y: 194 },
                { x: 170, y: 158 },
                { x: 215, y: 69 },
                { x: 213, y: 247 },
                { x: 93, y: 229 },
            ];

            for (let i = 0; i < totalCities; i++) {
              while (true) {
                let randomIndex = Math.floor(p5.random(nodeCoordinates.length));
                if (!cityAdded.includes(randomIndex)) {
                  cityAdded.push(randomIndex);
                  let v = p5.createVector(nodeCoordinates[randomIndex].x, nodeCoordinates[randomIndex].y);
                  cities[i] = v;
                  break;
                }
              }
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

        p5.beginShape();
        for (let i = 0; i < cities.length; i++) {
            p5.fill(255,0,0);
            p5.ellipse(cities[i].x, cities[i].y, 20, 20);
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

        //p5.frameRate(1);
  }

  return (
    <div>
      <h4>Honduras map example</h4>
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
}
