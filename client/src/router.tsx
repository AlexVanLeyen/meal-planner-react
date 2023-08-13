import React, { lazy } from 'react';
import { Navigate, Outlet, Route, Routes, defer } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import MainLayout from "@/layouts/MainLayout";
import request from '@/services/request';
import { api } from '@/config';
import { loader as PlanLoader } from '@/common/hooks/useMealPlanQuery';
import NotFound from './pages/notFound';


const Home = lazy(() => import("@/pages/home"));
const Plan = lazy(() => import("@/pages/plan"));
const Plans = lazy(() => import("@/pages/plans"));

const NotFoundRedirect = (<Navigate replace to="/404" />);


const Router = () => {
    const queryClient = useQueryClient();
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="plans" element={<Outlet />} >
                    <Route index element={<Plans />} loader={
                        async () => {
                            return defer({ plans: request.fetch(`${api.MEAL_PLANS}`) });
                        }
                    } />
                    <Route
                        path=":identifier"
                        element={<Plan />}
                        loader={PlanLoader(queryClient)}
                    />
                    <Route path="*" element={NotFoundRedirect}/>
                </Route>
                <Route path="404" element={<NotFound />}/>
                <Route path="*" element={NotFoundRedirect}/>
            </Route>
        </Routes>
    );
}

export default Router;
