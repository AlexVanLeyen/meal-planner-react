import React, { memo, useCallback, useEffect, useState } from 'react';
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

export function getMeal(type: string, meals: MealModel[]): MealModel | undefined {
    return meals.find((meal) => meal.type == type)
}

const TIMEOUT_MS = 1000;

export type MealSlot = MealModel & {
    onChange?: (meal: MealModel) => void
    timeout?: number
};

export const MealSlot: React.FC<MealSlot> = memo(props => {
    const {
        date,
        name,
        notes,
        onChange,
        timeout = TIMEOUT_MS,
        type
    } = props;
    const [isShowingNotes, setIsShowNotes] = useState(false);
    const [_name, setName] = useState(name);
 
    const handleClickOpenNote = useCallback(() => {
        setIsShowNotes(!isShowingNotes);
    }, [isShowingNotes]);

    const handleOnChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const emitChange = useCallback(
        (name: string) => setTimeout(
            () => onChange?.({ date, type, name, notes }),
            timeout
        ),
        [date, type, notes, timeout, onChange]
    );
    
    useEffect(() => {
        if (name === _name) return;
        const timeoutId = emitChange(_name)
        return () => clearTimeout(timeoutId);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [_name, name]);

    return (
        <div className="meal">
            <div className="slot" data-type={props.type}>
                <Editable className="name"
                    editElement={(<input autoFocus type="text" onChange={handleOnChangeName} value={_name}/>)}
                    element={(<>{_name}</>)}
                />
                <button type="button" onClick={handleClickOpenNote}>
                    {isShowingNotes ? "-" : "+" }
                </button>
            </div>
            <div className="notes" data-show={isShowingNotes}>
                <button className="btn btn-sm primary">+ Add Note</button>
                { props.notes.length > 0 && props.notes.map((note, index) => (
                    <Note {...note} key={index}/>
                ))}
            </div>
        </div>
    );
});

MealSlot.displayName = "Meal Slot";
