import styled from "styled-components";

export const CreatedDate = styled.p`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: end;
  margin-left: 25px;
  color: #bfc1c5;
`;

export const StatusText = styled.span``;

export const TaskItemContainer = styled.div<{ isCompleted: boolean }>`
  display: flex;
  flex-direction: column;
  border: 2px solid
    ${({ isCompleted }) => (isCompleted ? "#27ae60" : "#e4e7ec")};
  padding: 15px;
  border-radius: 5px;
  width: 300px;
  gap: 15px;

  ${StatusText} {
    color: ${({ isCompleted }) => isCompleted && "#27ae60"};
  }
`;

export const TaskManagerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const TaskItemHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: start;
  h4 {
    word-break: break-all;
    white-space: break-spaces;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;

  gap: 4px;
`;

export const TaskItemBody = styled.div`
  word-break: break-all;
  white-space: break-spaces;
  margin-left: 25px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
