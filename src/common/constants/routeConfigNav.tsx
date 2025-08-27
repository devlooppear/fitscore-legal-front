import { Routes } from "./routes";
import systemColors from "./systemColors";
import {
  FaHome,
  FaTachometerAlt,
  FaClipboardList,
  FaUser,
  FaBell,
  FaSignInAlt,
  FaUserPlus,
  FaInfoCircle,
} from "react-icons/fa";

export const routeConfigNav: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  [Routes.HOME]: {
    label: "Início",
    icon: <FaHome color="white" size={20} />,
  },
  [Routes.DASHBOARD]: {
    label: "Dashboard",
    icon: <FaTachometerAlt color="white" size={20} />,
  },
  [Routes.FORM_FITSCORE]: {
    label: "Fit Score",
    icon: <FaClipboardList color="white" size={20} />,
  },
  [Routes.PROFILE]: {
    label: "Perfil",
    icon: <FaUser color="white" size={20} />,
  },
  [Routes.NOTIFICATIONS]: {
    label: "Notificações",
    icon: <FaBell color="white" size={20} />,
  },
  [Routes.LOGIN]: {
    label: "Login",
    icon: <FaSignInAlt color={systemColors.blue[50]} size={20} />,
  },
  [Routes.REGISTER]: {
    label: "Cadastro",
    icon: <FaUserPlus color={systemColors.blue[50]} size={20} />,
  },
  [Routes.INTRODUCTION]: {
    label: "Introdução",
    icon: <FaInfoCircle color="white" size={20} />,
  },
};
