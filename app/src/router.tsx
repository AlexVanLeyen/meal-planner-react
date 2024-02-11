import React, { lazy } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import { loader as PlanLoader } from "@/common/hooks/useMealPlanQuery";
import { loader as PlansLoader } from "@/common/hooks/useMealPlansQuery";
import {
  actionNew as NewPlanAction,
  PlanActions,
} from "@/common/hooks/useMealPlanMutation";

import NotFound from "./pages/notFound";
import {
  RouteErrorBoundary,
  DefaultErrorBoundary,
} from "./common/components/ErrorBoundary";

const Home = lazy(() => import("@/pages/home"));
const Plan = lazy(() => import("@/pages/plan"));
const Plans = lazy(() => import("@/pages/plans"));

export const createRouter = (queryClient: QueryClient) => {
  return createBrowserRouter(
    [
      {
        element: <MainLayout />,
        ErrorBoundary: DefaultErrorBoundary,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "plans",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Plans />,
                loader: PlansLoader(queryClient),
              },
              {
                path: "new",
                action: NewPlanAction(queryClient),
              },
              {
                path: ":identifier",
                element: <Plan />,
                loader: PlanLoader(queryClient),
                action: PlanActions(queryClient),
                ErrorBoundary: RouteErrorBoundary,
              },
            ],
          },
          {
            path: "404",
            element: <NotFound />,
          },
          {
            path: "*",
            element: <Navigate replace to="/404" />,
          },
        ],
      },
    ],
    {
      basename: "/",
    },
  );
};
