export type NoteModel = {
    message: string;
}

export type MealModel = {
    date: Date;
    type: string;
    name: string;
    notes: NoteModel[];
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

export function getMealsForDay(day: Date, meals:MealModel[]): MealModel[] {
    return meals.reduce<MealModel[]>((prev, next) => {
        if (new Date(next.date).getDay() == day.getDay()) {
            prev.push(next);
        }
        return prev;
    }, []);
}

export function getMeal(type: string, meals: MealModel[]): MealModel | undefined {
    return meals.find((meal) => meal.type == type)
}
