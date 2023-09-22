import { TaskStatus, Task, TaskData } from "@lib/redux/task/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}task/`,
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getAllTask: builder.query<TaskData, { status: TaskStatus; page: number }>({
      query: ({ status, page }) => `?status=${status}&page=${page}`,
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: `create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: ({ id, ...patch }) => ({
        url: `${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<Task, Task["id"]>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
