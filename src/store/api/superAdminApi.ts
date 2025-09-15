import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
export interface Restaurant {
  id?: string;
  name: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRestaurantRequest {
  name: string;
  address: string;
}

export interface CreateRestaurantResponse {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// API Slice
export const superAdminApi = createApi({
  reducerPath: 'superAdminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SUPERADMIN_API_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Restaurant'],
  endpoints: (builder) => ({
    // Get all restaurants
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/shops',
      providesTags: ['Restaurant'],
    }),

    // Create a new restaurant
    createRestaurant: builder.mutation<CreateRestaurantResponse, CreateRestaurantRequest>({
      query: (restaurant) => ({
        url: '/shops',
        method: 'POST',
        body: restaurant,
      }),
      invalidatesTags: ['Restaurant'],
    }),

    // Get restaurant by ID
    getRestaurantById: builder.query<Restaurant, string>({
      query: (id) => `/shops/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Restaurant', id }],
    }),

    // Update restaurant
    updateRestaurant: builder.mutation<Restaurant, { id: string; data: Partial<CreateRestaurantRequest> }>({
      query: ({ id, data }) => ({
        url: `/shops/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Restaurant', id }],
    }),

    // Delete restaurant
    deleteRestaurant: builder.mutation<void, string>({
      query: (id) => ({
        url: `/shops/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Restaurant'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetRestaurantsQuery,
  useCreateRestaurantMutation,
  useGetRestaurantByIdQuery,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
} = superAdminApi;
