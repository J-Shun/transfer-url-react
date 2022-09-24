import { Input } from "./styles/Input.styled";
import { Button } from "./styles/Button.styled";
import { Group } from "./styles/Group.styled";
import { HomeSection } from "./styles/HomeSection.styled";
import { ShortLink } from "./ShortLink";
import { Card } from "./Card";

export const Home = () => {
  return (
    <HomeSection>
      <Button>Create Short Link</Button>
      <Group>
        <Input type="text" placeholder="Enter tags or short url" />
        <Button>Search</Button>
      </Group>
      <Button>Sort By</Button>
      <Button>Per Page</Button>

      <br />
      <br />

      <Card />

      <br />
      <br />

      <ShortLink />
    </HomeSection>
  );
};
