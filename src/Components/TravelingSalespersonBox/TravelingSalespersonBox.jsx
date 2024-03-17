import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import {factorialRecursivo, calcDistance, swap} from "./functions.js";


export default function TravelingSalespersonBox(props) {

    const [totalCities, setTotalCities] = useState(props.totalCities);

    let cities = [];
    let totalTimes = [];
    let totalDistances = [];

    let recordDistance;
    let bestEver;

    // Test
    let iterationNumber = 0;
    let max = factorialRecursivo(totalCities);

    const startTime = performance.now();
    let totalTime = 0;
    let endTime = 0;


    var totalPermutations;
    var count = 0;
    var order = [];

    useEffect(() => {
        // Este efecto se ejecutará cuando totalCities cambie
        setTotalCities(props.totalCities);
    }, [props.totalCities]);


    function setup(p5, canvasParentRef) {
        p5.createCanvas(600, 600).parent(canvasParentRef);

        for (let i = 0; i < totalCities; i++) {
            let v = p5.createVector(p5.random(p5.width), p5.random(p5.height));
            cities[i] = v;
            order[i] = i;
        }

        var d = calcDistance(cities);
        recordDistance = d;
        bestEver = cities.slice();

        totalPermutations = factorialRecursivo(totalCities);
        console.log(totalPermutations);
    }

    function draw(p5) {

        p5.background(0);
        p5.fill(255);
    
        // Verifica si cities está definido antes de usarlo
        if (cities && cities.length > 0) {
            for (let i = 0; i < cities.length; i++) {
                p5.ellipse(cities[i].x, cities[i].y, 8, 8);
            }
    
            p5.stroke(255);
            p5.strokeWeight(1);
            p5.noFill();
    
            p5.beginShape();
            for (let i = 0; i < order.length; i++) {
                p5.vertex(cities[i].x, cities[i].y);
            }
            p5.endShape();
    
            p5.stroke(255, 0, 255);
            p5.strokeWeight(4);
            p5.noFill();
            p5.beginShape();

            for (let i = 0; i < order.length; i++) {
                let n = order[i];
                p5.vertex(bestEver[n].x, bestEver[n].y);
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

            nextOrder();

            //p5.frameRate(1);
        }

        function nextOrder() {
            count++;
          
            var largestI = -1;
            for (var i = 0; i < order.length - 1; i++) {
              if (order[i] < order[i + 1]) {
                largestI = i;
              }
            }
            if (largestI == -1) {
              p5.noLoop();
              console.log('finished');
            }
          
            var largestJ = -1;
            for (var j = 0; j < order.length; j++) {
              if (order[largestI] < order[j]) {
                largestJ = j;
              }
            }
          
            swap(order, largestI, largestJ);
          
            var endArray = order.splice(largestI + 1);
            endArray.reverse();
            order = order.concat(endArray);
        }
    }

    return (
        <div>
            <h4>Traveling Salesperson Problem - Permutations</h4>
            <Sketch setup={setup} draw={draw} />
        </div>
    );
}

