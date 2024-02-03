export const BASE = window.process?.env?.REACT_APP_API_URL ?? "";
export const MEAL_PLAN = `${BASE}/plans`;
export const MEAL_PLANS = `${BASE}/plans`;
console.log("BASE", BASE);
export default {
    BASE,
    MEAL_PLAN,
    MEAL_PLANS
}
