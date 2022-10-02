import styled from "styled-components";

const CornerSection = styled.div`
  .card-corner {
    position: absolute;
    width: 30px;
    height: 30px;
  }

  .card-left-top {
    top: -5px;
    left: -5px;
    border-top: 5px solid #fcee0a;
    border-left: 5px solid #fcee0a;
  }

  .card-right-top {
    top: -5px;
    right: -5px;
    border-top: 5px solid #fcee0a;
    border-right: 5px solid #fcee0a;
  }

  .card-left-bottom {
    bottom: -5px;
    left: -5px;
    border-bottom: 5px solid #fcee0a;
    border-left: 5px solid #fcee0a;
  }

  .card-right-bottom {
    bottom: -5px;
    right: -5px;
    border-bottom: 5px solid #fcee0a;
    border-right: 5px solid #fcee0a;
  }
`;

export const Corner = () => {
  return (
    <CornerSection>
      <div className="card-corner card-left-top"></div>
      <div className="card-corner card-right-top"></div>
      <div className="card-corner card-left-bottom"></div>
      <div className="card-corner card-right-bottom"></div>
    </CornerSection>
  );
};
