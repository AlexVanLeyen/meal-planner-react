import React, { useCallback, useState } from 'react';
import { Note } from "../Note";
import { Editable } from '../Editable';

export interface Meal {
    name: string;
    type: string;
    notes: Note[];
}

export interface Plan {
    date: Date;
    meals: Meal[];
}

export function getMealsForDay(day: Date, plans: Plan[]): Meal[] {
    return plans.find(plan => new Date(plan.date).getDay() == day.getDay())?.meals ?? []; 
}

export function getMeal(type: string, meals: Meal[]): Meal {
    return meals.find((meal) => meal.type == type) ?? { type, name: "", notes: [] };
}

export const Meal: React.FC<Meal> = props => {
    const [isShowingNotes, setIsShowNotes] = useState(false);
    const [name, setName] = useState(props.name);

    const handleClickOpenNote = useCallback(() => {
        setIsShowNotes(!isShowingNotes);
    }, [isShowingNotes]);

    const handleOnChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    return (
        <div className="meal">
            <div className="slot" data-type={props.type.charAt(0)}>
                <Editable value={name} className="name">
                    <input type="text" onChange={handleOnChangeName} value={name}/>
                </Editable>
                <button type="button" onClick={handleClickOpenNote}>+</button>
            </div>
            <div className="notes" data-show={isShowingNotes}>
                { props.notes.length ? props.notes.map((note, index) => (
                    <Note {...note} key={index}/>
                )) : (
                    <div className="empty">No Notes</div>
                )}
            </div>
        </div>
    );
}
