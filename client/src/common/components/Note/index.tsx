import React from 'react';
import { FaNoteSticky } from 'react-icons/fa6';

export interface Note {
    message: string;
}
export const Note: React.FC<Note> = (props) => (
        <div className="note">
            <div className="icon"><FaNoteSticky /></div>
            <div className="message">{props.message}</div>
        </div>
);
