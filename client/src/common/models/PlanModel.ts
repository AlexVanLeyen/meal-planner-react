export type NoteModel = {
    message: string;
}

export type MealModel = {
    name: string;
    type: string;
    notes: NoteModel[];
}

export type PlanModel = {
    date: Date;
    meals: MealModel[];
}