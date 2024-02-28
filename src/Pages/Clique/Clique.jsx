import React from "react";
import Sketch from "react-p5";

export default function Clique(props) {
  let x = 50;
  let y = 50;

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