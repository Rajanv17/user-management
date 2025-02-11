import { JwtPayload } from "jsonwebtoken";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilter {
  search: string;
  country: string;
}

export interface DecodedToken extends JwtPayload {
  role?: UserRole;
}

export enum UserRole {
  Admin = "Admin",
  Staff = "Staff",
}
