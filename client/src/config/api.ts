import { MEAL_PLANNER_API_URL } from "./env";

export const BASE: string = MEAL_PLANNER_API_URL ?? "";
export const MEAL_PLAN: string = `${BASE}/plans`;
export const MEAL_PLANS: string = `${BASE}/plans`;

export default {
    BASE,
    MEAL_PLAN,
    MEAL_PLANS
}
