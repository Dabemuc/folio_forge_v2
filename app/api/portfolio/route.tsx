import { ApiResponse, PortfolioTO, PortfolioGetRequestBody, PortfolioPostRequestBody } from "@/types";
import { createPortfolio, findPortfolioById, findPortfoliosByUserId, updatePortfolio } from "@/db/db";
import { portfoliosTable, usersTable } from "@/db/schema";
import { ResultSet } from "@libsql/client";

// Read one or more portfolios
export async function GET(req: Request) {
  const { userId, portfolioId }: PortfolioGetRequestBody = await req.json();

  // Validate request
  if (!userId && !portfolioId) {
    return new Response(
      JSON.stringify({ result: "error", cause: `No user_token and no porfolio_id provided` } satisfies ApiResponse)
    );
  }

  if (userId) {
    // Find all portfolios for a user
    const result: (typeof portfoliosTable.$inferSelect)[] = await findPortfoliosByUserId(userId);
    if (!result || result.length === 0) {
      return new Response(
        JSON.stringify({ result: "error", cause: `No portfolios found for user` } satisfies ApiResponse)
      );
    }
    try {
      const portfolioContents: PortfolioTO[] = result.map(
        (row) => JSON.parse(row.content as string) satisfies PortfolioTO
      );
      return new Response(JSON.stringify({ result: "success", content: portfolioContents } satisfies ApiResponse));
    } catch (e) {
      console.log(e);
      return new Response(
        JSON.stringify({ result: "error", cause: `Error parsing content of portfolios` } satisfies ApiResponse)
      );
    }
  }

  if (portfolioId) {
    // Find a single portfolio by id
    const result: typeof portfoliosTable.$inferSelect = (await findPortfolioById(portfolioId))[0];
    if (!result) {
      return new Response(
        JSON.stringify({
          result: "error",
          cause: `No portfolio found for portfolioId ${portfolioId}`,
        } satisfies ApiResponse)
      );
    }
    try {
      const portfolioContent: PortfolioTO = JSON.parse(result.content as string) satisfies PortfolioTO;
      return new Response(JSON.stringify({ result: "success", content: portfolioContent } satisfies ApiResponse));
    } catch (e) {
      console.log(e);
      return new Response(
        JSON.stringify({ result: "error", cause: `Error parsing portfolio content` } satisfies ApiResponse)
      );
    }
  }
}

// Create or update a portfolio
export async function POST(req: Request) {
  const { user_token, portfolioId, portfolio }: PortfolioPostRequestBody = await req.json();

  // Authenticate user
  // TODO
  const userId = 1; // Testing

  // Validate request
  if (!user_token || !portfolioId || !portfolio) {
    return new Response(
      JSON.stringify({ result: "error", cause: `Invalid data provided in request` } satisfies ApiResponse)
    );
  }

  // Validate state
  // TODO

  // Save state to the database
  const existingPortfolio = (await findPortfolioById(portfolioId))[0];
  let result: ResultSet | undefined;
  if (existingPortfolio) {
    // Update the portfolio
    result = await updatePortfolio(portfolioId, JSON.stringify(portfolio.content), portfolio.description);
  } else {
    // Create a new portfolio
    result = await createPortfolio(userId, JSON.stringify(portfolio.content), portfolio.description);
  }
  if (!result || result.rowsAffected === 0) {
    console.log("Failed to update or create portfolio", result);
    return new Response(
      JSON.stringify({ result: "error", cause: `Failed to update or create portfolio` } satisfies ApiResponse)
    );
  }

  // Respond to client
  return new Response(JSON.stringify({ result: "success" } satisfies ApiResponse));
}
