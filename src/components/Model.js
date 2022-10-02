import styled from "styled-components";
import { BsExclamationCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { useContext } from "react";
import { Context } from "../App";

const ModelSection = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: ${(props) => (props.modelState.show ? "5" : "-1")};
  opacity: ${(props) => (props.modelState.show ? "1" : "0")};
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
    border: 2px solid
      ${(props) =>
        props.modelState.status === "error" ? "#e23832" : "#287bff"};
    padding: 1.5rem 2rem;
    max-width: 600px;
    min-width: 310px;

    &::before {
      content: "";
      position: absolute;
      height: 50px;
      width: 8px;
      background-color: ${(props) =>
        props.modelState.status === "error" ? "#e23832" : "#287bff"};
      left: 0;
    }

    &::after {
      content: "";
      position: absolute;
      height: 50px;
      width: 8px;
      background-color: ${(props) =>
        props.modelState.status === "error" ? "#e23832" : "#287bff"};
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

  button {
    padding: 0.5rem 1rem;
    background-color: #000;
    border: 1px solid
      ${(props) =>
        props.modelState.status === "error" ? "#e23832" : "#287bff"};
    color: ${(props) =>
      props.modelState.status === "error" ? "#e23832" : "#287bff"};
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

export const Model = () => {
  const { modelState, modelDispatch } = useContext(Context);
  const confirm = (e) => {
    e.preventDefault();
    modelDispatch({ type: "hide" });
  };

  return (
    <ModelSection modelState={modelState}>
      <div className="overlay"></div>
      <div className="model-content">
        {modelState.status === "error" ? (
          <BsExclamationCircleFill className="warning" />
        ) : (
          <BsFillCheckCircleFill className="success" />
        )}
        <h2>-- {modelState.status} --</h2>
        <p>{modelState.message}</p>
        <button onClick={confirm}>CONFIRM</button>
      </div>
    </ModelSection>
  );
};
