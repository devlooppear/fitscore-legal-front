import systemColors from "@/common/constants/systemColors";
import styled from "@emotion/styled";
import { Container, Box } from "@mui/material";

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${systemColors.blue[100]},
    ${systemColors.indigo[200]}
  );
`;

export const StyledContainer = styled(Container)`
  margin-top: 32px;
  margin-bottom: 48px;
  min-height: 80vh;
`;
