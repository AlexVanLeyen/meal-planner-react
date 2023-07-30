import React from 'react';
import { PlanTable } from '../../common/components/PlanTable';
import { mealTypes, themes } from '../../config';
import { mockPlanData } from '../../__mocks__';
import { ThemeSwitcher } from '../../common/components/ThemeSwitcher';

const plans = mockPlanData.map(plan => ({ ...plan, date: new Date(plan.date) }));
const date = new Date("2023-07-29");

export const Home: React.FC = () => {
    return (
        <div className='page'>
            <ThemeSwitcher themes={themes} />
            <PlanTable mealTypes={mealTypes} plans={plans} date={date} />
        </div>
    );
}
