import { createApi } from "@reduxjs/toolkit/query/react";
import AxiosPrivate from "../../Hooks/AxiosPrivate";

const axiosInstance = AxiosPrivate();
export const apiSlice = createApi({
  baseQuery: async (arg, api, extraOptions) => {
    const { baseUrl, ...axiosConfig } = arg;
    try {
      const response = await axiosInstance.request({
        ...axiosConfig,
      });

      return { data: response.data };
    } catch (error) {
      // Handle error if needed
      throw error;
    }
  },
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    //transaction
    getTransactions: builder.query({
      query: (userId) => ({
        url: `/Transaction?userId=${userId}`,
        method: "GET",
      }),
      transformResponse: (response) =>
        response.sort(
          (TransactionA, TransactionB) =>
            Date.parse(TransactionA.updatedAt) <
            Date.parse(TransactionB.updatedAt)
        ),
      providesTags: ["Transactions"],
    }),
    postTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/Transaction/AddTransaction",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        data: transaction,
      }),
      invalidatesTags: ["Transactions", "Categories"],
    }),
    editTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/Transaction/EditTransaction",
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        data: transaction,
      }),
      invalidatesTags: ["Transactions"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/Transaction/DeleteTransaction/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["Transactions"],
    }),
    //category
    getCategories: builder.query({
      query: (userId) => ({
        url: `/Category?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    postCategory: builder.mutation({
      query: (category) => ({
        url: "/Category",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        data: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    editCategory: builder.mutation({
      query: (category) => ({
        url: "/Category",
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },

        data: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/Category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  usePostCategoryMutation,
  useDeleteTransactionMutation,
  useEditTransactionMutation,
  usePostTransactionMutation,
  useGetCategoriesQuery,
  useGetTransactionsQuery,
} = apiSlice;
