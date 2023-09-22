"use client";
import {
  CheckboxContainer,
  CheckboxItem,
  TaskContainer,
  TaskContainerHeader,
  TaskItemsContainer,
} from "./Tasks.style";
import {
  useDeleteTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
} from "@lib/redux/task/index";
import { Button, Checkbox, Pagination } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Task, TaskStatus } from "@lib/redux/task/types";
import { CreateTaskModal } from "@/components/modals/createTask/CreateTaskModal";
import { TaskItem } from "@/components/task/taskItem/TaskItem";
import { EditTaskModal } from "@/components/modals/editTask/EditTaskModal";
import { useRouter, useSearchParams } from "next/navigation";

const checkBoxItems = [
  {
    key: "completed-key",
    label: "Completed",
    value: TaskStatus.Completed,
  },
  {
    key: "uncompleted-key",
    label: "Uncompleted",
    value: TaskStatus.Uncompleted,
  },
  {
    key: "all-key",
    label: "All",
    value: TaskStatus.All,
  },
];

export const Tasks: React.FC = () => {
  const TASK_PER_PAGE = 12;
  const { push } = useRouter();
  const { get } = useSearchParams();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isCreateModalOpen, setIsCreateOpenModalOpen] =
    useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<TaskStatus>(TaskStatus.All);
  const { data, isLoading } = useGetAllTaskQuery({
    status: filter,
    page: Number(get("page")) || 1,
  });

  const handleOpenCreateModal = () => setIsCreateOpenModalOpen(true);
  const handleOpenEditModal = (task: Task) => setEditTask(task);

  const handleCloseCreateModal = () => setIsCreateOpenModalOpen(false);
  const handleCloseEditModal = () => setEditTask(null);

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleUpdateTask = (task: Task) => {
    updateTask(task);
  };

  const handleChangePage = (page: number) => {
    push(`/?page=${page}`);
  };

  return (
    <TaskContainer>
      <CreateTaskModal
        onCancel={handleCloseCreateModal}
        isOpen={isCreateModalOpen}
      />

      <EditTaskModal task={editTask} onCancel={handleCloseEditModal} />

      <TaskContainerHeader>
        <Button onClick={handleOpenCreateModal} icon={<PlusOutlined />}>
          Add task
        </Button>
        <CheckboxContainer>
          {checkBoxItems.map((el) => (
            <CheckboxItem key={el.key}>
              <span>{el.label}</span>
              <Checkbox
                onChange={() => {
                  setFilter(el.value);
                }}
                checked={filter === el.value}
                value={el.value}
              />
            </CheckboxItem>
          ))}
        </CheckboxContainer>
      </TaskContainerHeader>
      <TaskItemsContainer>
        {data?.tasks.map((el) => (
          <TaskItem
            key={el.id}
            task={el}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
            handleOpenEditModal={handleOpenEditModal}
          />
        ))}
      </TaskItemsContainer>
      <Pagination
        showSizeChanger={false}
        current={Number(get("page")) || 1}
        pageSize={TASK_PER_PAGE}
        total={data?.count}
        onChange={(page) => handleChangePage(page)}
      />
    </TaskContainer>
  );
};
