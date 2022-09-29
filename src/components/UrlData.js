import { Card } from "../shared/Card";
import { Group, GroupCol } from "../shared/Group";
import { BsClipboardData } from "react-icons/bs";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { CardSubTitle, Tag } from "../shared/Text";
import { url } from "../api/routes";
import { Link } from "react-router-dom";
import "../assets/icon.css";
import { RiFileDownloadLine } from "react-icons/ri";
import { useState, useRef } from "react";
import { Confirm } from "./Confirm";

export const UrlData = ({ data }) => {
  const [checkDelete, setCheckDelete] = useState(false);
  const shortUrlRef = useRef(undefined);

  const copyUrl = () => {
    navigator.clipboard.writeText(shortUrlRef.current.innerText);
  };

  return (
    <>
      <Card>
        <Group justify="space-between" mb="1rem">
          <FiEdit className="edit-icon" />
          <Link to={`/user/shortUrl/${data._id}`}>
            <BsClipboardData className="analysis-icon" />
          </Link>
          <RiDeleteBack2Line
            className="delete-icon"
            onClick={() => {
              setCheckDelete({ ...checkDelete, showWarning: true });
            }}
          />
        </Group>
        <GroupCol justify="space-between" mb="1rem">
          <Group items="center" justify="space-between" className="copy-icon">
            <CardSubTitle>[SHORT URL]</CardSubTitle>
            <RiFileDownloadLine onClick={copyUrl} />
          </Group>
          <a href={url + data.shortUrl}>
            <p ref={shortUrlRef}>{url + data.shortUrl}</p>
          </a>
        </GroupCol>
        <GroupCol mb="1rem">
          <CardSubTitle>[Tags]</CardSubTitle>
          <Group items="center" wrap="true">
            <Tag>#Good</Tag>
            <Tag>#Great</Tag>
            <Tag>#arivederci</Tag>
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

      <Confirm
        checkDelete={checkDelete}
        setCheckDelete={setCheckDelete}
        id={data._id}
      />
    </>
  );
};
