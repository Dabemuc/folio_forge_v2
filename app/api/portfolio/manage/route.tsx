import { updatePortfolio } from "@/db/db";
import { ManagePortfolioPostRequestBody } from "@/types";
import { ResultSet } from "@libsql/client";

export async function POST(req: Request) {
  const { user_token, portfolioId, action }: ManagePortfolioPostRequestBody = await req.json();

  // Validate request
  if (!user_token || !portfolioId) {
    return new Response(JSON.stringify({ result: "error", cause: `Invalid data provided in request` }));
  }

  // Authenticate user
  // TODO
  const userId = 1; // Testing

  // Handle action
  console.log("Handling action", action, "for portfolio", portfolioId);
  let result: ResultSet | undefined;
  switch (action) {
    case "publish":
      result = await updatePortfolio(portfolioId, { published: true });
      break;
    case "unpublish":
      result = await updatePortfolio(portfolioId, { published: true });
      break;
    default:
      return new Response(JSON.stringify({ result: "error", cause: `Invalid action provided in request` }));
  }
  console.log("Portfolio updated", result);
  return new Response(JSON.stringify({ result: "success" }));
}
