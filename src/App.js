import { Background } from "./components/styles/Background.styled";
import { Container } from "./components/styles/Container.styled";
import { Form } from "./components/Form";
import { Home } from "./components/Home";

function App() {
  return (
    <Background>
      <Container>
        <Form />
        <Home />
      </Container>
    </Background>
  );
}

export default App;
