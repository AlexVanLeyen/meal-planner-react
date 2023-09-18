import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

export type Editable = {
    className?: string;
    editElement: React.ReactNode;
    element: React.ReactNode;
};

export const Editable: React.FC<Editable> = props => {
    const [isEditing, setIsEditing] = useState(false);

    const onBlur = useCallback(() => {
        setIsEditing(false);
    }, []);

    const onClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    return (
        <section className={classNames(props.className, "editable")}>
        { isEditing ? ( 
            <div onBlur={onBlur} className="child-container">
                {props.editElement}
            </div>
        ) : (
            <div onClick={onClick} className="text-container">
                {props.element}
            </div>
        )}
        </section>
    );
};
