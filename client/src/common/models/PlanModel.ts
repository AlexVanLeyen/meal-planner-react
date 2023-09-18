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
