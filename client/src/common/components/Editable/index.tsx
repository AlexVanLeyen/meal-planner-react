import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

export type Editable = React.PropsWithChildren & {
    value: string;
    className?: string;
};

export const Editable: React.FC<Editable> = props => {
    const [isEditing, setIsEditing] = useState(false);
    const [value] = useState(props.value);

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
                {props.children}
            </div>
        ) : (
            <div onClick={onClick} className="text-container">
                {value}
            </div>
        )}
        </section>
    );
};
