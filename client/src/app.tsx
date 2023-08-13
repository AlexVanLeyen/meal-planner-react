import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from "./router";
import "@/theme/app.css";
import { Loading } from "./common/components/Loading";

const queryClient = new QueryClient();

const App = () => (
    <React.Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient} >
            <Router />
        </QueryClientProvider>
    </React.Suspense>
);

export default App
