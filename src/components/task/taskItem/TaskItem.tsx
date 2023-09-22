import {
  ButtonsContainer,
  CreatedDate,
  TaskItemBody,
  TaskItemContainer,
  TaskItemHeader,
} from "./TaskItem.style";
import { Task } from "@lib/redux/task/types";
import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popconfirm } from "antd";

type Props = {
  task: Task;
  handleDeleteTask: (id: string) => void;
  handleOpenEditModal: (task: Task) => void;
  handleUpdateTask: (task: Task) => void;
};

export const TaskItem: React.FC<Props> = ({
  task,
  handleOpenEditModal,
  handleDeleteTask,
  handleUpdateTask,
}) => {
  return (
    <TaskItemContainer isCompleted={task.completed}>
      <ButtonsContainer>
        <Popconfirm
          onConfirm={() => handleDeleteTask(task.id)}
          title="Are you sure you want to delete the task?"
        >
          <Button icon={<DeleteOutlined />} />
        </Popconfirm>

        <Button
          onClick={() => handleOpenEditModal(task)}
          icon={<EditOutlined />}
        />
      </ButtonsContainer>
      <TaskItemHeader>
        <Checkbox
          onChange={(e) =>
            handleUpdateTask({ ...task, completed: e.target.checked })
          }
          checked={task.completed}
        />
        <h4>{task.name}</h4>
      </TaskItemHeader>
      <TaskItemBody>
        <span>{task.description}</span>
      </TaskItemBody>
      <CreatedDate>
        Created at {new Date(task.createdAt).toLocaleDateString()}
      </CreatedDate>
    </TaskItemContainer>
  );
};
