import React from 'react';
import { FaNoteSticky } from 'react-icons/fa6';
import { NoteModel } from '@/common/models';

export type Note = NoteModel

export const Note: React.FC<Note> = (props) => (
        <div className="note">
            <div className="icon"><FaNoteSticky /></div>
            <div className="message">{props.message}</div>
        </div>
);
