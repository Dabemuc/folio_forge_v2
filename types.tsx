export type H1_props = {
  text: string;
};

export type p_props = {
  text: string;
};

export type StateObject = {
  id: string;
  generator: (props: any) => JSX.Element;
  props: any;
};

export type PortfolioPostRequestBody = {
  user_token: string;
  portfolioId: number;
  portfolio: PortfolioTO;
};

export type PortfolioGetRequestBody = {
  portfolioId?: number;
  userId?: number;
};

export type ApiResponse =
  | {
      result: "success";
      content?: PortfolioTO | PortfolioTO[];
    }
  | {
      result: "error";
      cause: string;
    };

export type PortfolioTO = {
  description: string;
  content: StateObject[];
};
