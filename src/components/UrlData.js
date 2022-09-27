import { Card } from "../shared/Card";
import { Group, GroupCol } from "../shared/Group";
import { BsClipboardData } from "react-icons/bs";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { CardSubTitle, Tag } from "../shared/Text";

export const UrlData = ({ data }) => {
  console.log(data);
  return (
    <Card>
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
        <CardSubTitle>[SHORT URL]</CardSubTitle>
        <p>https://this_is_STEAM</p>
      </GroupCol>
      <GroupCol mb="1rem">
        <CardSubTitle>[Tags]</CardSubTitle>
        <Group items="center" wrap="true">
          <Tag>#Good</Tag>
          <Tag>#Great</Tag>
          <Tag>#arivederci</Tag>
          <Tag>#Great</Tag>
          <Tag>#Beautiful</Tag>
          <Tag>#Nanimonai</Tag>
          <Tag>#Wakaranai</Tag>
        </Group>
      </GroupCol>
      <GroupCol mb="1rem">
        <CardSubTitle>[Original URL]</CardSubTitle>
        <p>{data.originUrl}</p>
      </GroupCol>
      <GroupCol mb="1rem">
        <CardSubTitle>[No Repeat Visitors]</CardSubTitle>
        <p>{data.nonDupClicks}</p>
      </GroupCol>
    </Card>
  );
};
