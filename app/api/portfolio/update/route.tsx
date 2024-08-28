import { findPortfolioById, updatePortfolio, createPortfolio } from "@/db/db";
import { UpdatePortfolioPostRequestBody, ApiResponse } from "@/types";
import { ResultSet } from "@libsql/client";

// Create or update a portfolio
export async function POST(req: Request) {
  const { user_token, portfolioId, portfolio }: UpdatePortfolioPostRequestBody = await req.json();

  // Authenticate user
  // TODO
  const userId = 1; // Testing

  // Validate request
  if (!user_token || !portfolio) {
    return new Response(
      JSON.stringify({ result: "error", cause: `Invalid data provided in request` } satisfies ApiResponse)
    );
  }

  // Validate state
  // TODO

  // Save state to the database
  let result: ResultSet | undefined;
  if (portfolioId) {
    // Update the portfolio
    console.log("Updating portfolio", portfolioId);
    const existingPortfolio = (await findPortfolioById(portfolioId))[0];
    if (existingPortfolio) {
      console.log("Portfolio already exists, updating...")
      result = await updatePortfolio(portfolioId, { content: portfolio.content, description: portfolio.description });
    } else {
      console.log("Portfolio does not exist, creating...")
      result = await createPortfolio(userId, portfolio.content, portfolio.description);
    }

    if (!result || result.rowsAffected === 0) {
      console.log("Failed to update or create portfolio", result);
      return new Response(
        JSON.stringify({ result: "error", cause: `Failed to update or create portfolio` } satisfies ApiResponse)
      );
    }
  } else {
    console.log("Creating portfolio for user", userId, "with description", portfolio.description);
    // Create a new portfolio
    result = await createPortfolio(userId, portfolio.content, portfolio.description);
    if (!result || result.rowsAffected === 0) {
      console.log("Failed to create portfolio", result);
      return new Response(
        JSON.stringify({ result: "error", cause: `Failed to create portfolio` } satisfies ApiResponse)
      );
    }
  }

  // Respond to client
  console.log("Portfolio saved", result);
  return new Response(JSON.stringify({ result: "success" } satisfies ApiResponse));
}
