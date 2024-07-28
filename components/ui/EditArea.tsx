"use client";

import { StateObject } from "@/types";
import { Button } from "./button";
import DropArea from "./DropArea";
import { useState } from "react";

export default function EditArea({ state, setState }: { state: StateObject[]; setState: Function }) {
  const [hovering, setHovering] = useState(-1);

  function handleDelete(index: number) {
    setState((oldState: StateObject[]) => {
      const newState = [...oldState];
      newState.splice(index, 1);
      return newState;
    });
    console.log("deleted at index", index);
  }

  return (
    <div className="h-screen w-full flex flex-col items-center bg-background overflow-auto">
      <DropArea id="0" bigger={state.length == 0} />
      {state.map((element, index) => (
        <div key={index} className="w-full">
          <div
            className="w-full flex justify-between items-center relative p-6"
            onMouseEnter={() => setHovering(index)}
            onMouseLeave={() => setHovering(-1)}
          >
            <div className="w-full flex flex-col items-center">{element.generator(element.props)}</div>
            {hovering == index ? (
              <Button className="absolute right-0 scale-75 mr-6" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            ) : null}
          </div>
          <DropArea id={(index + 1).toString()} bigger={index + 1 == state.length} />
        </div>
      ))}
    </div>
  );
}
