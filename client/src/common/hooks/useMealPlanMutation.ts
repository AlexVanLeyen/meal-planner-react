import { QueryClient, useMutation } from "@tanstack/react-query";
import { PlanModel, withIdentifier } from "@/common/models";
import { executeMutation } from "@/common/utils/reactQueryUtils";
import Request from "@/services/request"
import { api } from "@/config";
import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";

const API_URL = api.MEAL_PLAN;

const createPlan = async (plan: PlanModel): Promise<PlanModel & withIdentifier> =>
    await Request.create(API_URL, plan);
const createMutation = (plan: PlanModel) => ({
    mutationFn: async () => createPlan(plan)
});

const updatePlan = async (identifier: string, plan: Partial<PlanModel>): Promise<PlanModel & withIdentifier> =>
    await Request.update(`${API_URL}/${identifier}`, plan);

const updateMutation = (identifier: string, plan: Partial<PlanModel>) => ({
    mutationFn: async () => updatePlan(identifier, plan)
});

const deletePlan = async (identifier: string): Promise<PlanModel & withIdentifier> =>
        await Request.delete(`${API_URL}/${identifier}`);

const deleteMutation = (identifier: string) => ({
    mutationFn: async () => deletePlan(identifier)
});


export function useMealPlanCreateMutation(plan: PlanModel) {
    return useMutation(createMutation(plan));
}

export function useMealPlanUpdateMutation(identifier: string, plan: PlanModel) {
    return useMutation(updateMutation(identifier, plan));
}

export function useMealPlanDeleteMutation(identifier: string) {
    return useMutation(deleteMutation(identifier));
}

export const defaultPlan: PlanModel = {
    name: "Untitled Plan",
    author: { name: "Unknown" },
    meals: []
};

export const actionNew = (queryClient: QueryClient): ActionFunction =>
    async ({ request }) => {
        if (request.method !== "POST") throw request; 
        const mutation = createMutation(defaultPlan);

        const newPlan = await executeMutation(queryClient, mutation)
            
        return redirect(`/plans/${newPlan._id}`);
    };

type PlanAction = {
    [key: string]: (client: QueryClient, args: ActionFunctionArgs) =>
        Promise<PlanModel & withIdentifier>
};
const PlanAction: PlanAction  = {
    PATCH: async (queryClient, { request, params }) => {
        const id = params.identifier;
        const formData = await request.formData();
        if (request.method !== "PATCH" 
            || !id
            || !formData.has("plan")
        ) throw request;

        // there has to be a better way to handle this.
        const plan = JSON.parse(formData.get("plan") as string) as Partial<PlanModel>;
        const mutation = updateMutation(id, plan);
        return await executeMutation(queryClient, mutation);
    },
    DELETE: async (queryClient, { request, params }) => {
        const id = params.identifier;
        if (!id) throw request;
        const mutation = deleteMutation(id);
        return await executeMutation(queryClient, mutation);
    }
};

export const PlanActions = (queryClient: QueryClient): ActionFunction =>
    args => {
        if (!Object.keys(PlanAction).includes(args.request.method)) {
            throw args.request;
        }
        return PlanAction[args.request.method](queryClient, args);
    };