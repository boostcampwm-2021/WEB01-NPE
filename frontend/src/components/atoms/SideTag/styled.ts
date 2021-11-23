import styled from "styled-components";

interface TagProps {
  tagBgColor: string;
  textColor: string;
}
interface DeleteButtonProps {
  deleteBgColor: string;
}

export const TagContainer = styled.li<TagProps>`
  display: flex;
  justify-content: space-between;
  // background-color: ${(props) => props.tagBgColor};
  background-color: #2d3e4f;
  border-radius: 50px;
  color: ${(props) => props.textColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin: 0px 0px 10px 7px;
`;

export const TagText = styled.div`
  padding: 3px 7px 6px 10px;
`;

export const DeleteButton = styled.button<DeleteButtonProps>`
  border-radius: 0px 50px 50px 0px;
  color: white;
  border: none;
  background-color: #2d3e4f;
  cursor: pointer;
  padding-left: 0px;
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;
