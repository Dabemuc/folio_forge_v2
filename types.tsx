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
