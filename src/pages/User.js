import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../App";
import { useFetch } from "../api/api";
import { Empty } from "../components/Empty";
import { UrlData } from "../components/UrlData";
import { ShortLinkForm } from "../components/ShortLinkForm";
import { PageLoading, ApiLoading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { Group, GroupCol } from "../shared/Group";
import { Container } from "../shared/Container";
import { BsFillPlusCircleFill } from "react-icons/bs";
import styled from "styled-components";

const UserSection = styled.div`
  .create-btn {
    position: fixed;
    right: 2.5rem;
    bottom: 2.5rem;
    color: #fcee0a;
    background-color: #000;
    cursor: pointer;
    font-size: 3.5rem;
    z-index: 2;
    border-radius: 50%;
    transition: 0.3s;

    &:hover {
      color: #fff;
    }
  }

  .block {
    margin-top: 8rem;
  }

  .sort {
    font-size: 2rem;
    color: #fff;
    margin-bottom: 1.5rem;
  }

  .sort-btn {
    padding: 0.25rem 1rem;
    font-size: 1.5rem;
    color: #fff;
    background-color: transparent;
    border: none;
    border-left: 2px solid #fff;
    border-right: 2px solid #fff;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      color: #3afacf;
      border-left: 2px solid #3afacf;
      border-right: 2px solid #3afacf;
    }
  }

  .time {
    color: ${(props) => props.time && "#3afacf"};
    border-left: ${(props) => props.time && "2px solid #3afacf"};
    border-right: ${(props) => props.time && "2px solid #3afacf"};
  }

  .click {
    color: ${(props) => props.click && "#3afacf"};
    border-left: ${(props) => props.click && "2px solid #3afacf"};
    border-right: ${(props) => props.click && "2px solid #3afacf"};
  }
`;

export const User = () => {
  const { dataListUrl, renderTrigger, callApi, sort, setSort } =
    useContext(Context);
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading } = useFetch(dataListUrl + sort, renderTrigger);

  const switchSort = (e) => {
    const name = e.target.name;
    if (name === "time") {
      setSort("&desc=createdAt");
    } else if (name === "click") {
      setSort("&desc=nonDupClicks");
    }
  };

  const shortLinkList = data.pages?.results;
  const pageStatus = {
    currentPage: data.pages?.page,
    totalPage: data.pages?.totalPages,
  };

  if (isLoading) return <PageLoading />;
  if (data.status !== "success") return <Navigate to="/" />;

  return (
    <UserSection
      time={sort === "&desc=createdAt"}
      click={sort === "&desc=nonDupClicks"}
    >
      <Container>
        <div className="block"></div>

        <GroupCol items="center">
          <p className="sort">-SORT BY-</p>
          <Group items="center" mb="4rem" gap="2rem">
            <button className="sort-btn time" name="time" onClick={switchSort}>
              TIME
            </button>
            <button
              className="sort-btn click"
              name="click"
              onClick={switchSort}
            >
              CLICK
            </button>
          </Group>
        </GroupCol>

        <BsFillPlusCircleFill
          className="create-btn"
          onClick={() => {
            setShowForm(true);
          }}
        />

        {shortLinkList.map((linkData) => {
          return <UrlData key={linkData._id} data={linkData} />;
        })}

        <Pagination pageStatus={pageStatus} />
      </Container>

      {callApi && <ApiLoading />}

      {shortLinkList.length < 1 && <Empty />}
      <ShortLinkForm showForm={showForm} setShowForm={setShowForm} />
    </UserSection>
  );
};
