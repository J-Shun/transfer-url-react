import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "../shared/Card";
import { BsClipboardData, BsChevronDoubleDown, BsTags } from "react-icons/bs";
import { RiFileDownloadLine, RiDeleteBack2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { url } from "../api/routes";
import { Group, GroupCol } from "../shared/Group";
import { Confirm } from "./Confirm";
import { EditOg } from "./EditOg";
import { EditTag } from "./EditTag";
import "../assets/icon.css";
import styled from "styled-components";

const UrlDataSection = styled.div`
  .visitor-title {
    color: #3afbd0;
    font-size: 1.75rem;
    font-weight: bold;
    font-style: italic;
    border-bottom: 2px solid #3afbd0;
    margin-bottom: 1rem;
  }

  .visitor-count {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3afbd0;
    font-weight: bold;
    width: 5rem;
    height: 5rem;
    font-size: 1.5rem;
    padding: 1rem;
    border: 5px solid #3afbd0;
    border-radius: 50%;
    transition: 0.3s;
  }

  .visitor-section {
    margin-left: auto;
    margin-right: auto;
  }

  .tag {
    font-size: 1.25rem;
    font-weight: bold;
    background-color: #287bff;
    margin: 0.25rem;
    padding: 0.25rem 0.5rem;

    &:hover {
      background-color: #e23832;
      cursor: pointer;
    }
  }

  .url-title {
    color: #3afbd0;
    font-size: 1.75rem;
    font-weight: bold;
    font-style: italic;
    border-bottom: 2px solid #3afbd0;
    margin-right: 0.5rem;
  }

  .url {
    color: #3afbd0;
    font-size: 1.5rem;
    text-align: center;
  }

  .detail-section {
    transition: 0.5s;
    transform: translateY(${(props) => props.showDetail || "-100%"});
    z-index: ${(props) => props.showDetail || "-1"};
    height: ${(props) => props.showDetail || "0"};
    margin-bottom: 3rem;
    overflow: hidden;
  }

  .detail-icon {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.25rem;
    left: 50%;
    bottom: 0.25rem;
    color: #fcee0a;
    cursor: pointer;
    transition: 0.5s;
    translate: -50%;
    rotate: ${(props) => props.showDetail && "180deg"};
  }
`;

export const UrlData = ({ data }) => {
  const [checkDelete, setCheckDelete] = useState(false);
  const [showOgForm, setShowOgForm] = useState(false);
  const [showTagForm, setShowTagForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const shortUrlRef = useRef(undefined);
  const originalUrlRef = useRef(undefined);

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrlRef.current.innerText);
  };

  const copyOriginalUrl = () => {
    navigator.clipboard.writeText(originalUrlRef.current.innerText);
  };

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <UrlDataSection showDetail={showDetail}>
      <Card>
        <div className="card-corner card-left-top"></div>
        <div className="card-corner card-right-top"></div>
        <div className="card-corner card-left-bottom"></div>
        <div className="card-corner card-right-bottom"></div>

        <Group justify="space-between" mb="3rem">
          <FiEdit
            className="edit-icon"
            onClick={() => {
              setShowOgForm(true);
            }}
          />

          <BsTags className="edit-icon" onClick={() => setShowTagForm(true)} />

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

        <Group items="center" justify="center" wrap="true" mb="3rem">
          {data.tags &&
            data.tags.map((tag, index) => {
              return (
                <span className="tag" key={index}>
                  {tag}
                </span>
              );
            })}
        </Group>

        <GroupCol mb="3rem" items="center">
          <h2 className="visitor-title">No Repeat Clicks</h2>
          <p className="visitor-count">{data.nonDupClicks}</p>
        </GroupCol>

        <GroupCol justify="space-between" mb="3rem">
          <Group items="center" justify="center" mb="1rem">
            <h2 className="url-title">SHORT URL</h2>
            <RiFileDownloadLine
              className="copy-icon"
              name="shortUrl"
              onClick={copyShortUrl}
            />
          </Group>
          <Group justify="space-evenly" items="center" wrap="nowrap">
            <a href={url + data.shortUrl}>
              <p ref={shortUrlRef} className="url">
                {url + data.shortUrl}
              </p>
            </a>
          </Group>
        </GroupCol>

        <div className="detail-section">
          <GroupCol mb="3rem" items="center">
            <Group mb="1rem">
              <h2 className="url-title">Original URL</h2>
              <RiFileDownloadLine
                className="copy-icon"
                onClick={copyOriginalUrl}
              />
            </Group>
            <p className="url" ref={originalUrlRef}>
              {data.originUrl}
            </p>
          </GroupCol>
        </div>

        <BsChevronDoubleDown className="detail-icon" onClick={toggleDetail} />
      </Card>

      <EditOg
        showOgForm={showOgForm}
        setShowOgForm={setShowOgForm}
        og={data.og}
        id={data._id}
      />

      <EditTag
        showTagForm={showTagForm}
        setShowTagForm={setShowTagForm}
        tags={data.tags}
        id={data._id}
      />

      <Confirm
        checkDelete={checkDelete}
        setCheckDelete={setCheckDelete}
        id={data._id}
      />
    </UrlDataSection>
  );
};
