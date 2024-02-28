import React from "react";
import Sketch from "react-p5";

function factorialRecursivo (n) {
    if (n == 0){
      return 1;
    }
    return n * factorialRecursivo (n-1);
}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function calcDistance(points) { 
    var sum = 0;
    for (var i = 0; i < points.length-1; i++) {
        var d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
        sum += d;
    }
    return sum;
}

function dist(x0, y0, x1, y1) {
    return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
}

export default function TravelingSalespersonBox(props) {

    let cities = [];
    let totalTimes = [];
    let totalDistances = [];
    let totalCities = 6;

    let recordDistance;
    let bestEver;

    // Test
    let contador = 0;
    let max = factorialRecursivo(totalCities);

    const startTime = performance.now();
    let endTime = 0;

  
    function setup(p5, canvasParentRef) {
        p5.createCanvas(1200, 950).parent(canvasParentRef);

        for (let i = 0; i < totalCities; i++) {
            let v = p5.createVector(p5.random(p5.width), p5.random(p5.height));
            cities[i] = v;
        }

        var d = calcDistance(cities);
        recordDistance = d;
        bestEver = cities.slice();
    }

    function draw(p5) {
        p5.background(0);
        p5.fill(255);

        for (let i = 0; i < cities.length; i++) {
            p5.ellipse(cities[i].x, cities[i].y, 8, 8);
        }

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
        contador++;
        for (let i = 0; i < cities.length; i++) {
            p5.vertex(bestEver[i].x, bestEver[i].y);
        }
        if (contador < max) {
            console.log(contador);
        } else if (contador == max) {
            console.log("Mejor distancia: " + recordDistance);
            console.log("Tiempo tomado para la mejor ruta: " + endTime/1000);
            console.log("Total distances: " + totalDistances);
            console.log("Total times: " + totalTimes);
        }
        p5.endShape();

        var i = p5.floor(p5.random(cities.length));
        var j = p5.floor(p5.random(cities.length));

        if (contador < max){
            swap(cities, i, j);
        }

        var d = calcDistance(cities);
        if (d < recordDistance) {
          recordDistance = d;
          bestEver = cities.slice();
          console.log(recordDistance);
          endTime = performance.now();
          totalTimes.push(endTime/1000);
          totalDistances.push(recordDistance);
        }

    }

  return <Sketch setup={setup} draw={draw} />;
}

