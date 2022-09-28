import styled from "styled-components";
import { BsExclamationCircleFill } from "react-icons/bs";
import { url, getShortLinkList } from "../api/routes";
import { deleteData } from "../api/api";

const ModelSection = styled.div`
  width: 100vw;
  height: 100vh;
  inset: 0;
  position: fixed;
  z-index: ${(props) => (props.show ? "5" : "-1")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  transition: 0.5s;

  .overlay {
    width: 100vw;
    height: 100vh;
    inset: 0;
    position: fixed;
    background: #000000aa;
  }

  .model-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    background: #000;
    border: 2px solid #e23832;
    padding: 1.5rem 1rem;
    max-width: 600px;
    min-width: 310px;

    &::before {
      content: "";
      position: absolute;
      height: 50px;
      width: 8px;
      background-color: #e23832;
      left: 0;
    }

    &::after {
      content: "";
      position: absolute;
      height: 50px;
      width: 8px;
      background-color: #e23832;
      right: 0;
    }
  }
  .warning,
  .success {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .warning {
    color: #e23832;
  }

  .success {
    color: #287bff;
  }

  h2 {
    text-align: center;
    text-transform: uppercase;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #000;
    border: 1px solid #e23832;
    color: #e23832;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      color: #fff;
      border: 1px solid #fff;
    }
  }
`;

export const Confirm = ({
  checkDelete,
  setCheckDelete,
  id,
  renderTrigger,
  setRenderTrigger,
}) => {
  const DeleteShortLink = async () => {
    const result = await deleteData("delete", url + getShortLinkList + id);
    if (result.status === "success") {
      setRenderTrigger(!renderTrigger);
    }
  };
  return (
    <ModelSection show={checkDelete}>
      <div className="overlay"></div>
      <div className="model-content">
        <BsExclamationCircleFill className="warning" />
        <h2>-- Warning --</h2>
        <p>Data Will Be Removed</p>
        <div className="button-group">
          <button
            onClick={() => {
              setCheckDelete(false);
              DeleteShortLink();
            }}
          >
            DELETE
          </button>
          <button onClick={() => setCheckDelete(false)}>CANCEL</button>
        </div>
      </div>
    </ModelSection>
  );
};
