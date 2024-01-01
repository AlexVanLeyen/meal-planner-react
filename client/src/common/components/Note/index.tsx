import React from 'react';
import { FaNoteSticky } from 'react-icons/fa6';
import { NoteModel } from '@/common/models';
import { Editable } from '../Editable';

export type Note = NoteModel & {
    onChange?: (value: string) => void;
}

export const Note: React.FC<Note> = (props) => {
    const readOnlyValue = props.message?.length > 0 ? props.message : "Click here to add a note!"

    function textAreaRef (element: HTMLTextAreaElement) {
        resizeTextArea(element);
    }

    function handleChange (event: React.ChangeEvent<HTMLTextAreaElement>): void {
        props.onChange?.(event.target.value)
    }
    
    return (
        <div className="note">
            <div className="icon"><FaNoteSticky /></div>
            <Editable
                element={<div className="message">{readOnlyValue}</div>}
                editElement={<textarea
                    ref={textAreaRef}
                    className="message"
                    autoFocus
                    defaultValue={props.message}
                    onChange={handleChange}
                />}
            />
        </div>
    );
};

function resizeTextArea (element: HTMLTextAreaElement|undefined) {
    if (!element) return;
    element.style.height = "";
    element.style.height = element.scrollHeight + "px";
}
