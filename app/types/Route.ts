import { ElementType } from 'react';
export type ClaimsType = {
  requiresAll?: Array<string>;
  requiresAny?: Array<string>;
  denyIfAny?: Array<string>;
  denyIfAll?: Array<string>;
};
export type RouteType = {
  key: string;
  path: string[];
  exact?: boolean;
  component: ElementType;
  claims?: ClaimsType;
  private?: boolean;
  breadcrumb?: string;
  expanded?: boolean;
  children?: RouteType[];
  description?: string;
};
