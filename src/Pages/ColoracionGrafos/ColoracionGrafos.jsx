import React from "react";
import Sketch from "react-p5";

// Make a test sketch program.
export default function ColoracionGrafos(props) {
  let x = 100;
  let y = 100;

  function setup(p5, canvasParentRef) {
    p5.createCanvas(800, 800).parent(canvasParentRef);
  }

  function draw(p5) {
    p5.background(0);
    p5.fill(255);
    p5.rect(x, y, 50, 50);
  }

  return <Sketch setup={setup} draw={draw} />;
}