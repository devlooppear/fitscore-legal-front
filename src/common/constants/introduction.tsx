import { FaBell, FaChartLine, FaUserPlus } from "react-icons/fa";
import systemColors from "./systemColors";

export interface IntroductionFeature {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  actions?: { labelKey: string; onClick: () => void }[];
}

export const introductionFeatures: Omit<IntroductionFeature, "actions">[] = [
  {
    icon: <FaChartLine size={40} color={systemColors.indigo[800]} />,
    titleKey: "features.dynamicEvaluation.title",
    descriptionKey: "features.dynamicEvaluation.description",
  },
  {
    icon: <FaBell size={40} color={systemColors.indigo[800]} />,
    titleKey: "features.notifications.title",
    descriptionKey: "features.notifications.description",
  },
  {
    icon: <FaUserPlus size={40} color={systemColors.indigo[800]} />,
    titleKey: "features.getStarted.title",
    descriptionKey: "features.getStarted.description",
  },
];
