export type H1_props = {
  text: string;
};

export type p_props = {
  text: string;
};

export type EditState = {
  portfolioId: number;
  description: string;
  editComponents: EditPortfolioComponent[];
};

export type EditPortfolioComponent = {
  id: string;
  generator: (props: any) => JSX.Element;
  props: any;
};

export type UpdatePortfolioPostRequestBody = {
  user_token: string;
  portfolioId: number;
  portfolio: Portfolio;
};

export type ManagePortfolioPostRequestBody = {
  user_token: string;
  portfolioId: number;
  action: "publish" | "unpublish";
};

export type ApiResponse =
  | {
      result: "success";
      content?: Portfolio | Portfolio[];
    }
  | {
      result: "error";
      cause: string;
    };

export type PortfolioTO = {
  description: string;
  content: string;
};

export type Portfolio = {
  description: string;
  content: BlockObject[];
};

export type BlockObject = {
  id: string;
  props: any;
};
