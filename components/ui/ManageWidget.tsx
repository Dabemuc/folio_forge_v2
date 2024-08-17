import { UpdatePortfolioPostRequestBody, EditState } from "@/types";
import { Button } from "./button";

export default function ManageWidget({ editState }: { editState: EditState }) {
  async function handleSave() {
    // Check if the state is empty
    if (editState.editComponents.length === 0) {
      console.log("State is empty");
      return;
    }

    // Send the state to the server
    const result = await fetch("/api/portfolio/update", {
      method: "POST",
      body: JSON.stringify({
        user_token: "1234",
        portfolioId: editState.portfolioId,
        portfolio: {
          description: editState.description,
          content: editState.editComponents,
        },
      } satisfies UpdatePortfolioPostRequestBody),
    });
    console.log(await result.json());
  }

  async function handlePublish() {
    const result = await fetch("/api/portfolio/manage", {
      method: "POST",
      body: JSON.stringify({
        user_token: "1234",
        portfolioId: editState.portfolioId,
        action: "publish",
      }),
    });
    console.log(await result.json());
  }

  return (
    <div className="h-1/4 flex flex-col items-center">
      <h1>Manage Portfolio</h1>
      <div className="flex flex-wrap justify-center">
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
