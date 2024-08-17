import { ApiResponse, PortfolioTO, UpdatePortfolioPostRequestBody, Portfolio, BlockObject } from "@/types";
import {
  createPortfolio,
  findPortfolioById,
  findPortfoliosByUserId,
  findPublishedPortfolioById,
  updatePortfolio,
} from "@/db/db";
import { portfoliosTable, usersTable } from "@/db/schema";
import { ResultSet } from "@libsql/client";

// Read one portfolio
export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const userId = searchParams.get("userId") as unknown as number; // TODO Replace with actual user token to authenticate user
  const portfolioId = searchParams.get("portfolioId") as unknown as number;

  // Validate request
  if (!portfolioId) {
    return new Response(JSON.stringify({ result: "error", cause: `No porfolio_id provided` } satisfies ApiResponse));
  }

  let result: typeof portfoliosTable.$inferSelect;
  if (userId) {
    // Find portfolio by id for user
    result = (await findPortfolioById(portfolioId))[0];
  } else {
    // Find published portfolio by id
    result = (await findPublishedPortfolioById(portfolioId))[0];
  }

  if (!result) {
    return new Response(
      JSON.stringify({
        result: "error",
        cause: `No portfolio found for portfolioId ${portfolioId}`,
      } satisfies ApiResponse)
    );
  }
  console.log("Found portfolio", result);
  return new Response(
    JSON.stringify({
      result: "success",
      content: {
        content: result.content,
        description: result.description,
      } satisfies Portfolio,
    } satisfies ApiResponse)
  );
}
