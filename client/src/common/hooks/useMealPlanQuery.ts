import { QueryClient, useQuery } from 'react-query';
import { PlanModel, withIdentifier } from '@/common/models';
import request from '@/services/request';
import { api } from '@/config';
import { LoaderFunctionArgs } from 'react-router-dom';

export const QUERY_KEY = "MealPlans";

const getPlan = async (identifier: string ): Promise<PlanModel & withIdentifier> =>
    await request.fetch(`${api.MEAL_PLAN}/${identifier}`);

const planQuery = (identifier: string) => ({
    queryKey: [QUERY_KEY, identifier],
    queryFn: async () => getPlan(identifier)
});

export const useMealPlanQuery = (identifier: string) =>
    useQuery(planQuery(identifier));

export const loader =
    (queryClient: QueryClient) =>
    async (args: LoaderFunctionArgs) => {
        const { identifier = "" } = args.params;
        const query = planQuery(identifier);
        return (
            queryClient.getQueriesData(query.queryKey) ??
            (await queryClient.fetchQuery(query))
        );
    }