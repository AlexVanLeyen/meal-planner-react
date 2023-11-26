import { isSameDay } from "date-fns";

export type NoteModel = {
    message: string;
}

export type MealModel = {
    date: string;
    type: string;
    name: string;
    note: NoteModel;
}

export type PlanAuthor = {
    name: string;
}

export type PlanModel = {
    name: string;
    description?: string;
    author: PlanAuthor;
    meals: MealModel[];
}

export function getMealsForDay(day: string, meals:MealModel[]): MealModel[] {
    return meals.filter((meal) => isSameDay(new Date(meal.date), new Date(day)))
}

export function getMeal(type: string, meals: MealModel[]): MealModel | undefined {
    return meals.find((meal) => meal.type == type)
}
