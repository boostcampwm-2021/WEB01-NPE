import styled from "styled-components";

export const SearchResult = styled.div`
  display: flex;
  min-width: 500px;
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
      .tag + .tag {
        margin-left: 10px;
      }
    }
  }
  .views-comment-container {
    margin-top: 20px;
    display: flex;
    div + div {
      margin-left: 10px;
    }
  }
`;
