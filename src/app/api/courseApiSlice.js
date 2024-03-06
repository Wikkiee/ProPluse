import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApiSlic = createApi({
  reducerPath: "courseApiSlic",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000",
  }),
  endpoints: (builder) => ({
    postCreateCourse: builder.mutation({
      query: (data) => ({
        url: "course/newcourse",
        method: "POST",
        body: data,
      }),
    }),
    getMyCourses: builder.query({
      query: (userId) => ({
        url: `/api/v1/course/user/${userId}`,
      }),
    }),
  }),
});

export const { usePostCreateCourseMutation, useGetMyCoursesQuery } =
  courseApiSlic;
