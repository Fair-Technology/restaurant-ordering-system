import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item } from "../../features/restaurantOwner/types";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    // Get all  items for a specific shop
    getItemsByShopId: builder.query<Item[], string>({
      query: (shopId) => `/items?shopId=${shopId}`,
      providesTags: ["Item"],
    }),

    // Create a new  item
    createItem: builder.mutation<Item, Partial<Item>>({
      query: (item) => ({
        url: "/items",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Item"],
    }),

    // Update a item
    updateItem: builder.mutation<Item, { id: string; data: Partial<Item> }>({
      query: ({ id, data }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),

    // Delete a item
    deleteItem: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),

    // get available items for a specific shop
    getAvailableItemsByShop: builder.query<Item[], string>({
      query: (shopId) => `/items?shopId=${shopId}&isAvailable=true`,
      providesTags: ["Item"],
    }),
  }),
});

export const {
  useGetItemsByShopIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetAvailableItemsByShopQuery,
} = itemApi;
