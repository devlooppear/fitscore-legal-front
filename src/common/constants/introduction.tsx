import { FaBell, FaChartLine, FaUserPlus } from "react-icons/fa";
import systemColors from "./systemColors";

export interface IntroductionFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  actions?: { label: string; onClick: () => void }[];
}

export const introductionFeatures: Omit<IntroductionFeature, "actions">[] = [
  {
    icon: <FaChartLine size={40} color={systemColors.indigo[800]} />,
    title: "Avaliação Dinâmica",
    description:
      "Receba um FitScore completo baseado em Performance, Energia e Cultura para cada candidato.",
  },
  {
    icon: <FaBell size={40} color={systemColors.indigo[800]} />,
    title: "Notificações Automáticas",
    description:
      "Alertas imediatos sobre resultados dos candidatos para manter o processo atualizado.",
  },
  {
    icon: <FaUserPlus size={40} color={systemColors.indigo[800]} />,
    title: "Comece Agora",
    description:
      "Crie sua conta ou faça login se já possui cadastro e comece a avaliar candidatos.",
  },
];
