import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";

const API_BASE = import.meta.env.VITE_API_BASE;

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: 'include',
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
      providesTags: (result = []) => [
        {type: 'Todo', id: 'LIST'},
        ...result.map((todo) => ({type: 'Todo', id: todo.id})),
      ],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: '/todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: [{type: 'Todo', id: 'LIST'}],
    }),
    updateTodo: builder.mutation({
      query: ({id, ...patch}) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, arg) => [{type: 'Todo', id: arg.id}],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{type: 'Todo', id}],
    })
  })
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;