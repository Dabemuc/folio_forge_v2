import { PortfolioPostRequestBody, StateObject } from "@/types";
import { Button } from "./button";

export default function ManageWidget({ state }: { state: StateObject[] }) {
  async function handleSave() {
    // Check if the state is empty
    if (state.length === 0) {
      console.log("State is empty");
      return;
    }

    // Send the state to the server
    const result = await fetch("/api/portfolio", {
      method: "POST",
      body: JSON.stringify({
        user_token: "1234",
        portfolioId: 1,
        portfolio: {
          description: "Portfolio",
          content: state,
        },
      } satisfies PortfolioPostRequestBody),
    });
    console.log(await result.json());
  }

  function handlePublish() {
    console.log("Publish - Not implemented");
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
