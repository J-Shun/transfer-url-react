import styled from "styled-components";
import { url, shortLinkRoute } from "../api/routes";

const PageContainer = styled.ul`
  display: flex;
  font-size: 1.25rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: 0.75rem;
`;

const Page = styled.li`
  position: relative;
  padding: 1rem 1.25rem;
  font-weight: bold;
  color: #fff;
  background-color: transparent;
  border: none;
  z-index: 1;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border: 2px solid #fff;
    transform: scale(-1, 1) skew(22deg);
    background-color: ${(props) => (props.active ? "#287bff" : "transparent")};
    transition: 0.3s;
  }

  &:hover::before {
    background-color: #287bff;
  }
`;

export const Pagination = ({ pageStatus, setDataListUrl }) => {
  const { currentPage, totalPage } = pageStatus;
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const changePage = (e) => {
    const clickPage = e.target.textContent;
    setDataListUrl(`${url + shortLinkRoute}?page=${clickPage}`);
  };

  return (
    <PageContainer currentPage={pageStatus.currentPage}>
      {pages.map((page, index) => {
        return (
          <Page key={index} active={currentPage === page} onClick={changePage}>
            {page}
          </Page>
        );
      })}
    </PageContainer>
  );
};
