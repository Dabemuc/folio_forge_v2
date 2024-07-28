import Heading1 from "./draggables/Heading1";
import Paragraph from "./draggables/Paragraph";

export default function ComponentsWidget() {
  return (
    <div className="h-3/4 w-full flex flex-col items-center">
      <h1>Components</h1>
      <div className="w-full flex flex-wrap justify-center">
        <Heading1 />
        <Paragraph />
      </div>
    </div>
  );
}
