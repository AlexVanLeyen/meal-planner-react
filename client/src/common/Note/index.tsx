import React from 'react';
import { FaNoteSticky } from 'react-icons/fa6';

interface NoteProps {
    message: string;
}

export const Note: React.FC<NoteProps> = (props) => {

    return (
        <div className="note">
            <div className="icon"><FaNoteSticky /></div>
            <div className="message">{props.message}</div>
        </div>
    )
}