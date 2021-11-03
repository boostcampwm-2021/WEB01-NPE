import styled from "styled-components";

interface ButtonProps {
  bgColor: string;
  textColor: string;
  width: string;
  height: string;
}
interface TextProps {
  textColor: string;
}

export const StyledSearchResult = styled.div`
  display: flex;
  width: 900px;
  height: 500px;

  .profile-container__profile {
    position: relative;
    top: 30px;
  }

  .title-container {
    display: flex;
    align-items: center;
    img {
      margin-left: 10px;
    }
    .title-container__indicator {
      margin-left: 10px;
    }
  }

  .markdown-container {
    min-height: 200px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    .tag-container {
      display: flex;
      li {
        list-style: none;
      }

      li + li {
        margin-left: 30px;
      }
    }
  }
  .views-comment-container {
    display: flex;
    div {
      display: flex;
    }
  }
`;

const Icon = styled.img`
  display: block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Text = styled.div<TextProps>`
  font-size: 16px;
  color: ${(props) => props.textColor};
`;
