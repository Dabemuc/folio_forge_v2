import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, CardFooter } from "../card";
import { H1_props } from "@/types";

export default function Heading1() {
  const cardContent = <CardContent>_H1-SVG_</CardContent>;
  const cardFooter = <CardFooter>Heading 1</CardFooter>;

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "h1",
    data: {
      dragOverlay: (
        <Card className="opacity-50">
          {cardContent}
          {cardFooter}
        </Card>
      ),
      generator: generateJSX,
      props: { text: "Heading 1" },
    },
  });

  return (
    <Card ref={setNodeRef} {...listeners} {...attributes}>
      {cardContent}
      {cardFooter}
    </Card>
  );
}

function generateJSX(props: H1_props) {
  return <h1>{props.text}</h1>;
}
