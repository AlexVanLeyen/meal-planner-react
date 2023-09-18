import { Editable } from '@/common/components/Editable';
import { PlanTable } from '@/common/components/PlanTable';
import React, { useState } from 'react';
import { mealTypes } from '@/config';

const NewPlan: React.FC = () => {
    const [title, setTitle] = useState("Untitled Plan");

    return (
        <div className="page">
            <Editable
                element={(
                    <h1 className="title">{title}</h1>
                )}
                editElement={(
                    <input
                        autoFocus
                        value={title} 
                        type="text"
                        className="title"
                        onChange={(event) => setTitle(event.target.value)} 
                    />
                )}
            />
            <PlanTable mealTypes={mealTypes}/>
        </div>
    )
};

export default NewPlan;
