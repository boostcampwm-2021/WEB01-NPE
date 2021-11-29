import styled from "styled-components";

export const DetailHeader = styled.div`
  border-bottom: 1px solid hsl(210deg 8% 45%);
  padding-bottom: 10px;
  width: 100%;
`;

export const DetailHeaderDetail = styled.div`
  font-size: 14px;
  color: hsl(210deg 8% 45%);
`;

export const DetailBody = styled.div`
  width: 100%;
  display: flex;
`;

export const DetailBodyDesc = styled.div`
  padding: 20px;
  height: 100%;
  min-height: 160px;
  border-bottom: 1px solid #e1e4e8;
`;

export const VoteContainer = styled.div`
  padding-left: 15px;
  padding-top: 10px;
`;

export const DetailInner = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DetailBodyInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-left: 1px solid #e1e4e8;
  margin-left: 20px;
  position: relative;
`;

export const DetailBodyInfo = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TagListContainer = styled.div`
  width: 100%;
`;

export const DeleteBtn = styled.span`
  font-size: 14px;
  position: absolute;
  right: 10px;
`;

export const SvgDiv = styled.div<{ fill: string }>`
  fill: ${(props) => props.fill};

  :hover {
    cursor: pointer;
  }
`;
