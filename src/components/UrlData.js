import { UrlDataSection } from "./styles/UrlDataSection.styled";
import { Group, GroupCol } from "./styles/Group.styled";
import { BsClipboardData } from "react-icons/bs";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

export const UrlData = () => {
  return (
    <UrlDataSection>
      <Group justify="space-between" mb="1rem">
        <FiEdit style={{ width: "28px", height: "28px", cursor: "pointer" }} />
        <BsClipboardData
          style={{ width: "28px", height: "28px", cursor: "pointer" }}
        />
        <RiDeleteBack2Line
          style={{
            width: "28px",
            height: "28px",
            cursor: "pointer",
            color: "#e23832",
          }}
        />
      </Group>
      <GroupCol justify="space-between" mb="1rem">
        <h4>[SHORT URL]</h4>
        <p>https://this_is_STEAM</p>
      </GroupCol>
      <GroupCol mb="1rem">
        <h4>[Tags]</h4>
        <Group items="center" wrap>
          <span>#Good</span>
          <span>#Great</span>
          <span>#arivederci</span>
          <span>#Great</span>
          <span>#Beautiful</span>
          <span>#Nanimonai</span>
          <span>#Wakaranai</span>
        </Group>
      </GroupCol>
      <GroupCol mb="1rem">
        <h4>[Original URL]</h4>
        <p>
          https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/75f1e23a-87fd-4eee-8cd4-5f16e0cabee8/specs/
        </p>
      </GroupCol>
      <GroupCol mb="1rem">
        <h4>[Visitor]</h4>
        <p>50</p>
      </GroupCol>
    </UrlDataSection>
  );
};
