import React from "react";

export default function Start(props) {
  return (
    <div className="container-start">
      <h1 className="bold title-element">Quizzical</h1>
      <p className="title-element">React Section 4 Scrimba Task</p>
      <button onClick={props.handleClick}>Start quiz</button>
    </div>
  );
}
