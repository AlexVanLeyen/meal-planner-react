import React, { useCallback, useEffect, useState } from 'react';
import { Note } from "../Note";
import { Editable } from '../Editable';
import { PlanModel, MealModel } from '@/common/models'

export function getMealsForDay(day: Date, plans: PlanModel[]): MealModel[] {
    return plans.find(plan => new Date(plan.date).getDay() == day.getDay())?.meals ?? []; 
}

export function getMeal(type: string, meals: MealModel[]): MealModel {
    return meals.find((meal) => meal.type == type) ?? { type, name: "", notes: [] };
}

const TIMEOUT_MS = 1000;

export type MealSlot = MealModel & {
    onChange?: (meal: MealModel) => void
};

export const MealSlot: React.FC<MealSlot> = props => {
    const [isShowingNotes, setIsShowNotes] = useState(false);
    const [name, setName] = useState(props.name);
    const { type, notes, onChange } = props;

    const handleClickOpenNote = useCallback(() => {
        setIsShowNotes(!isShowingNotes);
    }, [isShowingNotes]);

    const handleOnChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onChange?.({
                name,
                type,
                notes
            })
        }, TIMEOUT_MS);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [name, type, notes, onChange])

    return (
        <div className="meal">
            <div className="slot" data-type={type.charAt(0)}>
                <Editable value={name} className="name">
                    <input type="text" onChange={handleOnChangeName} value={name}/>
                </Editable>
                <button type="button" onClick={handleClickOpenNote}>+</button>
            </div>
            <div className="notes" data-show={isShowingNotes}>
                { notes.length ? notes.map((note, index) => (
                    <Note {...note} key={index}/>
                )) : (
                    <div className="empty">No Notes</div>
                )}
            </div>
        </div>
    );
}
