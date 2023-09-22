"use client";
import { useCreateTaskMutation } from "@lib/redux/task";
import { StyledForm } from "./CreateTaskModal.style";
import { Button, Input, Modal, notification } from "antd";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

interface FormValues {
  name: string;
  description: string;
}

type Props = {
  isOpen: boolean;
  onCancel: () => void;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required").min(4, "Min length 4 symbols"),
  description: Yup.string().required("Required").min(4, "Min length 4 symbols"),
});

export const CreateTaskModal: React.FC<Props> = ({ isOpen, onCancel }) => {
  const [createTask, {}] = useCreateTaskMutation();
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createTask(values)
        .unwrap()
        .then((el) => {
          onCancel();
          notification.open({
            type: "success",
            placement: "top",
            message: `Task created`,
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

  return (
    <Modal
      title="Create task"
      onCancel={() => {
        formik.resetForm();
        onCancel();
      }}
      closable
      open={isOpen}
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
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </StyledForm>
    </Modal>
  );
};
