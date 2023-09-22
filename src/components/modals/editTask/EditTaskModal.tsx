"use client";
import { useCreateTaskMutation, useUpdateTaskMutation } from "@lib/redux/task";
import { StyledForm } from "./EditTaskModal.style";
import { Button, Input, Modal, notification } from "antd";
import { Field, Form, Formik, useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { Task } from "@lib/redux/task/types";

interface FormValues {
  name: string;
  description: string;
}

type Props = {
  onCancel: () => void;
  task: Task | null;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required").min(4, "Min length 4 symbols"),
  description: Yup.string().required("Required").min(4, "Min length 4 symbols"),
});

export const EditTaskModal: React.FC<Props> = ({ onCancel, task }) => {
  const [updateTask] = useUpdateTaskMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      updateTask({ ...values, id: task?.id })
        .unwrap()
        .then((el) => {
          onCancel();
          notification.open({
            type: "success",
            placement: "top",
            message: `Task updated`,
          });
        })
        .catch(({ data }) => {
          notification.open({
            type: "error",
            placement: "top",
            message: `${data.message}`,
          });
        });
    },
  });

  useEffect(() => {
    if (task)
      formik.setValues({
        name: task.name,
        description: task.description,
      });
  }, [task]);

  return (
    <Modal
      title="Edit task"
      onCancel={() => {
        formik.resetForm();
        onCancel();
      }}
      destroyOnClose
      closable
      open={!!task}
      footer={null}
    >
      <StyledForm onSubmit={formik.handleSubmit}>
        <label>
          Name:
          <Input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <div>{formik.errors.name ? formik.errors.name : null}</div>
        </label>
        <label>
          Description:
          <Input
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <div>
            {formik.errors.description ? formik.errors.description : null}
          </div>
        </label>
        <Button
          //   disabled={formik.errors.description || formik.errors.name}
          type="primary"
          htmlType="submit"
        >
          Update
        </Button>
      </StyledForm>
    </Modal>
  );
};
