import styled from "styled-components";

const TagSection = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;

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
`;

export const Tag = ({ tags }) => {
  if (tags.length === 0) return;

  return (
    <TagSection>
      {tags.map((tag, index) => {
        return (
          <li key={index} className="tag">
            {tag}
          </li>
        );
      })}
    </TagSection>
  );
};
