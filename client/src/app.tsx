import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { createRouter } from "./router";
import "@/theme/app.css";
import { Loading } from "./common/components/Loading";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();
const router = createRouter(queryClient);

const App = () => (
    <React.Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient} >
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.Suspense>
);

export default App
