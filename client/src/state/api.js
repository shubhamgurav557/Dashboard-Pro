import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transactions", "Login", "Register", "Geography", "Sales", "Admins", "Dashboard"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => `client/products`,
            providesTags: ["Products"]
        }),
        getCustomers: build.query({
            query: () => `client/customers`,
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query: ({ page, limit, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, limit, sort, search }
            }),
            providesTags: ["Transactions"]
        }),
        validateLogin: build.query({
            query: ({ email, password }) => ({
                url: "/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }),
            providesTags: ["Login"]
        }),
        createUser: build.query({
            query: ({ name, email, password, occupation, phoneNumber, country, state, city }) => ({
                url: "/register",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    occupation,
                    phoneNumber,
                    country,
                    state,
                    city
                })
            }),
            providesTags: ["Register"]
        }),
        getGeography: build.query({
            query: () => `client/geography`,
            providesTags: ["Geography"]
        }),
        getSales: build.query({
            query: () => `sales/sales`,
            providesTags: ["Sales"]
        }),
        getAdmins: build.query({
            query: () => 'management/admins',
            providesTags: ["Admins"]
        }),
        getDashboard: build.query({
            query: () => 'general/dashboard',
            providesTags: ["Dashboard"]
        })
    })
})

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useValidateLoginQuery, useCreateUserQuery, useGetGeographyQuery, useGetSalesQuery, useGetAdminsQuery, useGetDashboardQuery } = api;