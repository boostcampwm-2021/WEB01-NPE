import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 30px 30px 30px 30px;
  background-color: #fff;

  > {
    button,
    img,
    div {
      margin: 20px 0px 20px 0px;
    }
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;
