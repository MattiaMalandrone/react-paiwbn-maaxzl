import { ClaimType } from '.';
export type RoleType = {
  id: number;
  code: string;
  description: string;
  claims: ClaimType[];
};
