import { useMutation } from "react-query";
import { PlanModel, withIdentifier } from "@/common/models";
import Request from "@/services/request"
import { api } from "@/config";

const API_URL = api.MEAL_PLAN;

export function useMealPlanMutation() {

    const create = useMutation({
        mutationFn: async (plan: PlanModel): Promise<PlanModel> =>
            await Request.create(API_URL, plan)
    });

    const update = useMutation({
        mutationFn: async (plan: PlanModel & withIdentifier): Promise<PlanModel> =>
            await Request.update(`${API_URL}/${plan._id}`, plan)
    });

    const destroy = useMutation({
        mutationFn: async (plan: PlanModel & withIdentifier): Promise<PlanModel> =>
            await Request.delete(`${API_URL}/${plan._id}`)
    })

    return {
        create,
        update,
        destroy
    };
}