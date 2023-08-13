import React, { useCallback, useEffect, useState } from 'react';
import { Note } from "../Note";
import { Editable } from '../Editable';
import { MealModel } from '@/common/models'

export function getMealsForDay(day: Date, meals:MealModel[]): MealModel[] {
    return meals.reduce<MealModel[]>((prev, next) => {
        if (new Date(next.date).getDay() == day.getDay()) {
            prev.push(next);
        }
        return prev;
    }, [])
}

export function getMeal(type: string, meals: MealModel[]): MealModel {
    return meals.find((meal) => meal.type == type) ?? { 
        type,
        date: new Date(),
        name: "",
        notes: [] 
    };
}

const TIMEOUT_MS = 1000;

export type MealSlot = MealModel & {
    onChange?: (meal: MealModel) => void
    timeout?: number
};

export const MealSlot: React.FC<MealSlot> = props => {
    const [isShowingNotes, setIsShowNotes] = useState(false);
    const [name, setName] = useState(props.name);
    const { onChange, timeout = TIMEOUT_MS, ...meal } = props;

    const handleClickOpenNote = useCallback(() => {
        setIsShowNotes(!isShowingNotes);
    }, [isShowingNotes]);

    const handleOnChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onChange?.({ ...meal, name })
        }, timeout);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [meal, name, onChange, timeout])

    return (
        <div className="meal">
            <div className="slot" data-type={meal.type.charAt(0)}>
                <Editable value={name} className="name">
                    <input autoFocus type="text" onChange={handleOnChangeName} value={name}/>
                </Editable>
                <button type="button" onClick={handleClickOpenNote}>
                    {isShowingNotes ? "-" : "+" }
                </button>
            </div>
            <div className="notes" data-show={isShowingNotes}>
                { meal.notes.length ? meal.notes.map((note, index) => (
                    <Note {...note} key={index}/>
                )) : (
                    <div className="empty">No Notes</div>
                )}
            </div>
        </div>
    );
}
