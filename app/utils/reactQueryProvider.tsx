/** @format */

"use client";

import { QueryClient, QueryClientProvider } from "react-query";

import { PropsWithChildren, useState } from "react";
import React from "react";

type props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function ReactQueryProvider({ children }: props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
