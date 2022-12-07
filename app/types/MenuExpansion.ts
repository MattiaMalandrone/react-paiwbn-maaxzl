export type MenuExpansionType = Array<{
  key: string;
  expanded: boolean;
  children?: MenuExpansionType;
}>;
