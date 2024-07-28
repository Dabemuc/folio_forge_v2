import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, CardFooter } from "../card";
import { H1_props, p_props } from "@/types";

export default function Paragraph() {
  const cardContent = <CardContent>_P-SVG_</CardContent>;
  const cardFooter = <CardFooter>Paragraph</CardFooter>;

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "p",
    data: {
      dragOverlay: (
        <Card className="opacity-50">
          {cardContent}
          {cardFooter}
        </Card>
      ),
      generator: generateJSX,
      props: {
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      },
    },
  });

  return (
    <Card ref={setNodeRef} {...listeners} {...attributes}>
      {cardContent}
      {cardFooter}
    </Card>
  );
}

function generateJSX(props: p_props) {
  return <p>{props.text}</p>;
}
