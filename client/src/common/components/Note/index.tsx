import React from 'react';
import { FaNoteSticky } from 'react-icons/fa6';
import { NoteModel } from '@/common/models';
import { Editable } from '../Editable';

export type Note = NoteModel

export const Note: React.FC<Note> = (props) => (
    <div className="note">
        <div className="icon"><FaNoteSticky /></div>
        <Editable 
            element={<div className="message">{props.message}</div>}
            editElement={<textarea />}
        />
    </div>
);
