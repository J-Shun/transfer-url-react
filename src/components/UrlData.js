import { Card } from "../shared/Card";
import { Group, GroupCol } from "../shared/Group";
import { BsClipboardData, BsChevronDoubleDown, BsTags } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { CardSubTitle, Tag } from "../shared/Text";
import { url, shortLinkRoute } from "../api/routes";
import { sendData } from "../api/api";
import { Link } from "react-router-dom";
import "../assets/icon.css";
import { RiFileDownloadLine } from "react-icons/ri";
import { useState, useRef } from "react";
import { Confirm } from "./Confirm";
import { Input } from "../shared/Input";
import { MdOutlineDoneAll } from "react-icons/md";
import { toArray } from "../utilities/toArray";
import { Og } from "./Og";

export const UrlData = ({ data }) => {
  const [checkDelete, setCheckDelete] = useState(false);
  const [tags, setTags] = useState(data.tags);
  const [tagsStatus, setTagsStatus] = useState(data.tags.join(" "));
  const [editTags, setEditTags] = useState(false);
  const [showOgForm, setShowOgForm] = useState(false);
  const shortUrlRef = useRef(undefined);

  const copyUrl = () => {
    navigator.clipboard.writeText(shortUrlRef.current.innerText);
  };

  const handleTagsStatus = (e) => {
    setTagsStatus(e.target.value);
  };

  const submitTagsStatus = async () => {
    const newTags = toArray(tagsStatus) === "" ? [] : toArray(tagsStatus);
    const newData = { tags: newTags };
    const result = await sendData(
      "POST",
      `${url + shortLinkRoute}/${data._id}/tags`,
      newData
    );
    console.log(result);
    setTags(newTags);
    setEditTags(false);
  };

  return (
    <>
      <Card>
        <div
          style={{
            width: "30px",
            height: "30px",
            position: "absolute",
            top: "0",
            left: "0",
            borderLeft: "5px solid #FCEE0A",
            borderTop: "5px solid #FCEE0A",
          }}
        ></div>
        <div
          style={{
            width: "30px",
            height: "30px",
            position: "absolute",
            top: "0",
            right: "0",
            borderRight: "5px solid #FCEE0A",
            borderTop: "5px solid #FCEE0A",
          }}
        ></div>
        <div
          style={{
            width: "30px",
            height: "30px",
            position: "absolute",
            bottom: "0",
            left: "0",
            borderLeft: "5px solid #FCEE0A",
            borderBottom: "5px solid #FCEE0A",
          }}
        ></div>
        <div
          style={{
            width: "30px",
            height: "30px",
            position: "absolute",
            bottom: "0",
            right: "0",
            borderRight: "5px solid #FCEE0A",
            borderBottom: "5px solid #FCEE0A",
          }}
        ></div>
        <Group justify="space-between" mb="1rem">
          <FiEdit
            className="edit-icon"
            onClick={() => {
              setShowOgForm(true);
            }}
          />
          <Link to={`/user/shortUrl/${data._id}`}>
            <BsClipboardData className="analysis-icon" />
          </Link>
          <TiDeleteOutline
            className="delete-icon"
            onClick={() => {
              setCheckDelete({ ...checkDelete, showWarning: true });
            }}
          />
        </Group>
        <GroupCol justify="space-between" mb="1rem">
          <Group items="center" justify="space-between" className="copy-icon">
            <CardSubTitle>SHORT URL</CardSubTitle>
            <RiFileDownloadLine onClick={copyUrl} />
          </Group>
          <a href={url + data.shortUrl}>
            <p ref={shortUrlRef} style={{ color: "#fff" }}>
              {url + data.shortUrl}
            </p>
          </a>
        </GroupCol>
        <GroupCol mb="1rem">
          <Group>
            <CardSubTitle>Tags</CardSubTitle>
            <BsTags
              className="edit-icon"
              onClick={() => setEditTags(!editTags)}
            />
          </Group>
          <GroupCol>
            <Group items="center" wrap="true">
              {tags &&
                tags.map((tag, index) => {
                  return <Tag key={index}>{tag}</Tag>;
                })}
            </Group>
            {editTags === true && (
              <Group items="center">
                <Input
                  style={{ paddingRight: "2rem" }}
                  value={tagsStatus}
                  onChange={handleTagsStatus}
                />
                <MdOutlineDoneAll
                  className="done-icon"
                  onClick={submitTagsStatus}
                />
              </Group>
            )}
          </GroupCol>
        </GroupCol>
        <GroupCol mb="1rem">
          <CardSubTitle>Original URL</CardSubTitle>
          <p>{data.originUrl}</p>
        </GroupCol>
        <GroupCol mb="1rem">
          <CardSubTitle>No Repeat Visitors</CardSubTitle>
          <p>{data.nonDupClicks}</p>
        </GroupCol>
        <BsChevronDoubleDown className="detail-icon" />
      </Card>

      <Og
        showOgForm={showOgForm}
        setShowOgForm={setShowOgForm}
        og={data.og}
        id={data._id}
      />

      <Confirm
        checkDelete={checkDelete}
        setCheckDelete={setCheckDelete}
        id={data._id}
      />
    </>
  );
};
