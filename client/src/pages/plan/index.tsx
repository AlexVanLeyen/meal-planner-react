/* eslint-disable */
import React, { useState } from 'react';
import { mealTypes, themes } from '@/config';
import { PlanTable } from '@/common/components/PlanTable';
import { ThemeSwitcher } from '@/common/components/ThemeSwitcher';
import { Navigate, useParams } from 'react-router-dom';
import { useMealPlanQuery } from '@/common/hooks/useMealPlanQuery';
import { Loading } from '@/common/components/Loading';

const Plan: React.FC = () => {
    const [ date ] = useState();
    const params = useParams();
    const { data: plan, error, isLoading } = useMealPlanQuery(params.identifier ?? "");

    if (error instanceof Response && error.status === 404) {
        return (<Navigate replace to="/404" />);
    }
    
    if (isLoading) {
        return (
           <div className='page items-center'>
                <Loading />
           </div> 
        )
    }

    return (
        <div className='page'>
            <div className="flex w-full justify-between">
                <ThemeSwitcher themes={themes} />
            </div>
            { plan && (
                <PlanTable 
                    mealTypes={mealTypes}
                    plan={plan}
                    date={date}
                />
            )}
        </div>
    );
}

export default Plan; 