import { UserType } from "@/enum/userType";

export const Routes = {
  HOME: "/",
  FORM_FITSCORE: "/fitscore",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  PROFILE: "/profile",
  INTRODUCTION: "/introduction",
  REGISTER: "/register",
  NOTIFICATIONS: "/notifications",
} as const;

export type RouteKey = keyof typeof Routes;
export type RoutePath = (typeof Routes)[RouteKey];

export const PublicRoutes: RoutePath[] = [
  Routes.LOGIN,
  Routes.REGISTER,
  Routes.INTRODUCTION,
];

export const RoutesByUser: Record<UserType, RoutePath[]> = {
  [UserType.CANDIDATE]: [
    Routes.HOME,
    Routes.FORM_FITSCORE,
    Routes.PROFILE,
    Routes.NOTIFICATIONS,
  ],
  [UserType.RECRUITER]: [
    Routes.HOME,
    Routes.DASHBOARD,
    Routes.PROFILE,
    Routes.NOTIFICATIONS,
  ],
};
