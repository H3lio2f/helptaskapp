import Siderbar from "../Siderbar";
import TopBar from "../TopBar";
import Main from "../Main";
import { Container } from "./styles";

export default function Layout({ children }) {
  return (
    <Container>
      <Siderbar />
      <TopBar />
      <Main>{children}</Main>
    </Container>
  );
}
