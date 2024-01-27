import React from 'react';
import { FaNoteSticky } from 'react-icons/fa6';
import { NoteModel } from '@/common/models';

export type Note = NoteModel & {
    onChange?: (value: string) => void;
}

export const Note: React.FC<Note> = (props) => {
    function textAreaRef (element: HTMLTextAreaElement) {
        resizeTextArea(element);
    }

    function handleChange (event: React.ChangeEvent<HTMLTextAreaElement>): void {
        props.onChange?.(event.target.value)
    }
    
    return (
        <div className="note">
            <div className="icon"><FaNoteSticky /></div>
            <textarea
                ref={textAreaRef}
                className="message"
                autoFocus
                defaultValue={props.message}
                onChange={handleChange}
                placeholder="Add a note!"
                />
        </div>
    );
};

function resizeTextArea (element: HTMLTextAreaElement|undefined) {
    if (!element) return;
    element.style.height = "";
    element.style.height = element.scrollHeight + "px";
}
