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

    const onChange = useCallback(() => {
        console.log("change event called");
    }, []);

    return (
        <section className={classNames(props.className, "editable")}>
        { isEditing ? ( 
            <div onBlur={onBlur} onChange={onChange}>
                {props.children}
            </div>
        ) : (
            <div onClick={onClick}>
                {value}
            </div>
        )}
        </section>
    );
};
