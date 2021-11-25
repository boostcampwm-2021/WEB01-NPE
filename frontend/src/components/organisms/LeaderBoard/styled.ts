import styled from "styled-components";

export const WrappedContainer = styled.aside`
  align-self: start;
  position: sticky;
  z-index: 10;
  top: 120px;
  width: 320px;
  margin-top: 80px;
  min-height: 700px;
  height: 70%;
`;

export const Icon = styled.span`
  margin-right: 5px;
`;

export const Container = styled.div`
  margin: 0px 10px 0px 40px;
`;

export const RankingContainer = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 0px 0px;
`;

export const RankingHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  padding: 10px;
  color: white;
  background-color: var(--orange-primary);
`;

export const RankerList = styled.ul`
  margin: 0;
  padding: 10px;
`;

export const Ranker = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 10px;
  color: #1b8cff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateX(10px);
    transform: scale(1.1);
    background-color: #1b8cff;
    color: white;
  }
`;

export const RankerProfile = styled.div`
  display: flex;
  align-items: center;
`;

export const RankerNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  margin-right: 10px;
`;

export const RankerImage = styled.div`
  width: 27px;
  height: 27px;
  padding-top: 2px;
  margin-right: 10px;
  img {
    border-radius: 20px;
  }
`;

export const RankerName = styled.div`
  font-weight: 450;
`;

export const RankerScore = styled.div`
  display: flex;
  align-items: center;
  font-weight: 550;
  color: #83c1ff;
`;

export const QuestionsContainer = styled.div`
  margin-top: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px 5px 0px 0px;
`;

export const Questions = styled.ul`
  margin: 0;
  padding: 0;
  background-color: #fdf7e2;
  padding-bottom: 10px;
`;

export const QuestionHeader = styled.div`
  background-color: #fbf3d5;
  border-bottom: 1px solid #f1e5bc;
  padding: 10px;
  color: #6a737c;
  font-size: 14px;
  font-weight: 600;
`;
export const QuestionHead = styled.span`
  margin-bottom: 5px;
`;

export const Question = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  margin: 10px 0px;
  cursor: pointer;
`;

export const QuestionTitle = styled.div`
  display: inline-block;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #3b4045;
  font-weight: 350;
  font-size: 14px;
`;

export const QuestionThumbsUp = styled.div`
  font-size: 16px;
`;
