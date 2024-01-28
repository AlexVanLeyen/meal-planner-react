export const BASE = process?.env?.REACT_APP_API_URL ?? "";
export const MEAL_PLAN = `${BASE}/plans`;
export const MEAL_PLANS = `${BASE}/plans`;

export default {
    BASE,
    MEAL_PLAN,
    MEAL_PLANS
}