import { CardSection } from "./styles/CardSection.styled";
import { Group } from "./styles/Group.styled";

export const Card = () => {
  return (
    <CardSection>
      <Group>
        <h3>Short Link</h3>
        <button>Copy Link</button>
        <button>Check Data</button>
      </Group>
      <button>Delete Link</button>
    </CardSection>
  );
};
