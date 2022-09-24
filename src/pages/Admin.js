import { Input } from "../components/styles/Input.styled";
import { Button } from "../components/styles/Button.styled";
import { Group } from "../components/styles/Group.styled";
import { HomeSection } from "../components/styles/HomeSection.styled";
import { ShortLink } from "../components/ShortLink";
import { Card } from "../components/Card";

export const Admin = () => {
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
