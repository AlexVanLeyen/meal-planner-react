import React, { useCallback, useEffect, useState } from 'react';
import { Note } from "../Note";
import { Editable } from '../Editable';
import { MealModel } from '@/common/models'

export type MealSlot = MealModel & {
    onChange?: (meal: MealModel) => void
    timeout?: number
};

const TIMEOUT_MS = 1000;
export const MealSlot: React.FC<MealSlot> = (props) => {
    const {
        date,
        name,
        note,
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
            () => onChange?.({ date, type, name, note }),
            timeout
        ),
        [date, type, note, timeout, onChange]
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
                <Note {...note} />
            </div>
        </div>
    );
};
