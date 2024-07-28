import { Button } from "./button";

export default function ManageWidget() {
  function handleSave() {
    console.log("Save - Not implemented");
  }

  function handlePublish() {
    console.log("Publish - Not implemented");
  }

  return (
    <div className="h-1/4 flex flex-col items-center">
      <h1>Manage Portfolio</h1>
      <div>
        <Button className="m-3" onClick={handleSave}>
          Save
        </Button>
        <Button className="m-3" onClick={handlePublish}>
          Publish
        </Button>
      </div>
    </div>
  );
}
