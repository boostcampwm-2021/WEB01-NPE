import styled from "styled-components";

interface TagProps {
  bgColor: string;
  textColor: string;
}
interface DeleteButtonProps {
  bgColor: string;
}

export const TagContainer = styled.li<TagProps>`
  display: flex;
  justify-content: space-between;
  width: 150px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50px;
  color: ${(props) => props.textColor};
  box-shadow: 0px 4px 4px var(--black-10), 0px 4px 20px var(--black-10);
  margin-bottom: 15px;
`;

export const TagText = styled.div`
  padding: 5px 0px 8px 15px;
`;

export const DeleteButton = styled.button<DeleteButtonProps>`
  width: 30px;
  border-radius: 0px 50px 50px 0px;
  color: white;
  border: none;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
`;
