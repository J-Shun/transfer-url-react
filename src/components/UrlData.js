import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "../shared/Card";
import { BsClipboardData, BsChevronDoubleDown, BsTags } from "react-icons/bs";
import { RiFileDownloadLine, RiDeleteBack2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { url } from "../api/routes";
import { Group, GroupCol } from "../shared/Group";
import { Corner } from "../shared/Corner";
import { Tag } from "./Tag";
import { EditOg } from "./EditOg";
import { EditTag } from "./EditTag";
import { Confirm } from "./Confirm";
import styled from "styled-components";

const UrlDataSection = styled.div`
  .visitor-title {
    color: #3afbd0;
    font-size: 1.75rem;
    font-weight: bold;
    font-style: italic;
    border-bottom: 2px solid #3afbd0;
    margin-bottom: 1.5rem;
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

  .btn-group {
    font-size: 1.75rem;
    color: #fff;
    transition: 0.3s;
    cursor: pointer;
  }

  .edit-btn {
    &:hover {
      color: #fcee0a;
    }
  }

  .tag-btn {
    &:hover {
      color: #287bff;
    }
  }

  .analyze-btn {
    &:hover {
      color: #3afbd0;
    }
  }

  .delete-btn {
    &:hover {
      color: #e23832;
    }
  }

  .copy-btn {
    color: #fcee0a;
    font-size: 1.75rem;
    cursor: pointer;
  }

  .detail-btn {
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
        <Corner />

        <Group justify="space-between" mb="3rem">
          <FiEdit
            className="btn-group edit-btn"
            onClick={() => {
              setShowOgForm(true);
            }}
          />

          <BsTags
            className="btn-group tag-btn"
            onClick={() => setShowTagForm(true)}
          />

          <Link to={`/user/shortUrl/${data._id}`}>
            <BsClipboardData className="btn-group analyze-btn" />
          </Link>

          <RiDeleteBack2Line
            className="btn-group delete-btn"
            onClick={() => {
              setCheckDelete({ ...checkDelete, showWarning: true });
            }}
          />
        </Group>

        <Tag tags={data.tags} />

        <GroupCol mb="3rem" items="center">
          <h2 className="visitor-title">No Repeat Clicks</h2>
          <p className="visitor-count">{data.nonDupClicks}</p>
        </GroupCol>

        <GroupCol justify="space-between" mb="3rem">
          <Group items="center" justify="center" mb="1.25rem">
            <h2 className="url-title">SHORT URL</h2>
            <RiFileDownloadLine
              className="copy-btn"
              name="shortUrl"
              onClick={copyShortUrl}
            />
          </Group>
          <Group justify="space-evenly" items="center" wrap="nowrap">
            <p ref={shortUrlRef} className="url">
              {url + data.shortUrl}
            </p>
          </Group>
        </GroupCol>

        <div className="detail-section">
          <GroupCol mb="3rem" items="center">
            <Group mb="1rem">
              <h2 className="url-title">Original URL</h2>
              <RiFileDownloadLine
                className="copy-btn"
                onClick={copyOriginalUrl}
              />
            </Group>
            <p className="url" ref={originalUrlRef}>
              {data.originUrl}
            </p>
          </GroupCol>
        </div>

        <BsChevronDoubleDown className="detail-btn" onClick={toggleDetail} />
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
