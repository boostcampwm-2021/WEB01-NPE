import styled from "styled-components";

export const Container = styled.aside`
  align-self: start;
  position: sticky;
  top: 120px;
  z-index: 10;
  width: 220px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 0px 0px;
  margin-top: 4px;
  min-height: 700px;
  height: 70%;
`;

export const Header = styled.div`
  padding: 15px;
  background-color: var(--orange-primary);
  border-radius: 5px 5px 0px 0px;
  margin-bottom: 5px;
`;

export const HeaderText = styled.div`
  font-size: 15px;
  font-weight: 300;
  color: white;
`;
export const InputContainer = styled.div`
  padding: 10px;
`;

export const Icon = styled.span`
  margin-right: 5px;
`;

export const InputLabel = styled.div`
  padding-left: 1px;
  color: #2b5672;
  font-size: 17px;
  font-weight: 400;
  margin-bottom: 8px;
`;

export const UlTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

export const Divider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f0f3f5;
  border-top: 1px solid #e1e4e8;
  border-bottom: 1px solid #e1e4e8;
  color: #6e8b9f;
  font-weight: 400;
  margin-bottom: 15px;
  span {
    padding-top: 3px;
  }
`;

export const LiveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 0px 10px;
  & > h2 {
    font-size: 15px;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-right: 20px;
  margin-bottom: 10px;
`;
