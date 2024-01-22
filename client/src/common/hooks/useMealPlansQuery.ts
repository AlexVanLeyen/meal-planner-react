import { QueryClient, useQuery } from '@tanstack/react-query';
import { PlanModel, withIdentifier } from '@/common/models';
import request from '@/services/request';
import { api } from '@/config';
import { LoaderFunction } from 'react-router-dom';

export const QUERY_KEY = "MealPlans";

const getPlans = async (): Promise<[PlanModel & withIdentifier]> =>
    await request.fetch(`${api.MEAL_PLANS}`);

const plansQuery = () => ({
    queryKey: [QUERY_KEY],
    queryFn: async () => getPlans()
});

export const useMealPlansQuery = () =>
    useQuery(plansQuery());

export const loader = (queryClient: QueryClient): LoaderFunction =>
    async () => {
        const query = plansQuery();
        return (
            queryClient.getQueriesData({ queryKey:  query.queryKey }) ??
            (await queryClient.fetchQuery(query))
        );
    };
