import styled from "styled-components";

export const TaskContainer = styled.div`
  display: flex;
  align-items: center;

  justify-content: center;
  gap: 15px;
  width: 100%;
  flex-direction: column;
`;

export const TaskContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const CheckboxItem = styled.div`
  display: flex;
  gap: 5px;
`;

export const TaskItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: 100%;
  align-items: stretch;
  justify-content: center;
`;

export const SpinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
