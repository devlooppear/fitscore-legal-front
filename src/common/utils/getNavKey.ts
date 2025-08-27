import { Routes } from "../constants/routes";

export function getNavKey(route: string) {
  switch (route) {
    case Routes.HOME:
      return "home";
    case Routes.DASHBOARD:
      return "dashboard";
    case Routes.FORM_FITSCORE:
      return "fitscore";
    case Routes.PROFILE:
      return "profile";
    case Routes.NOTIFICATIONS:
      return "notifications";
    case Routes.LOGIN:
      return "login";
    case Routes.REGISTER:
      return "register";
    case Routes.INTRODUCTION:
      return "introduction";
    default:
      return route;
  }
}
