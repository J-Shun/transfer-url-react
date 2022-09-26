import styled from "styled-components";
import { BsExclamationCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

const ModelSection = styled.div`
  width: 100vw;
  height: 100vh;
  inset: 0;
  position: fixed;
  z-index: 5;
  opacity: ${(props) => (props.model ? "1" : "1")};
  transition: 0.3s;

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
    padding: 1.5rem 2rem;
    max-width: 600px;
    min-width: 300px;

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
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
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

export const Model = () => {
  const retry = (e) => {
    e.preventDefault();
  };
  return (
    <ModelSection>
      <div className="overlay"></div>
      <div className="model-content">
        <BsExclamationCircleFill className="warning" />
        <BsFillCheckCircleFill className="success" />
        <h2>-- ERROR --</h2>
        <p>Wrong Password</p>
        <button onClick={retry}>RETRY</button>
      </div>
    </ModelSection>
  );
};
