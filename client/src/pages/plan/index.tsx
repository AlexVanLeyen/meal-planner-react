import React, { useCallback, useEffect, useState } from 'react';
import { mealTypes } from '@/config';
import { PlanTable } from '@/common/components/PlanTable';
import { Navigate, useLocation, useParams, useSubmit } from 'react-router-dom';
import { useMealPlanQuery } from '@/common/hooks/useMealPlanQuery';
import { Loading } from '@/common/components/Loading';
import { Editable } from '@/common/components/Editable';
import { MealModel } from '@/common/models';

const Plan: React.FC = () => {
    const submit = useSubmit();
    const location = useLocation();
    const [ date ] = useState();
    const params = useParams();
    const { data: plan, error, isLoading, refetch } = useMealPlanQuery(params.identifier ?? "");
    const [ title, setTitle ] = useState<string>("");
    
    useEffect(() => {
        if (isLoading || plan?.name === title) return
        setTitle(plan?.name ?? "")
    }, [isLoading, plan?.name, title]);

    const onBlurTitle = useCallback(() => {
        if (title !== plan?.name) {
            const modifiedPlan = { plan: JSON.stringify({ name: title }) };
            submit(modifiedPlan, {
                method: "PATCH",
                action: `${location.pathname}`,
            });
        }
    }, [title, plan?.name, location.pathname, submit])

    const onChangePlan = useCallback<(meal: MealModel) => void>(async (modifiedMeal) => {
        const modifiedPlan = { meals: [ ...plan?.meals ?? [] ] };
        const index = plan?.meals?.findIndex(
            meal => meal.date === modifiedMeal.date && meal.type === modifiedMeal.type
        ) ?? -1

        if (index >= 0) modifiedPlan.meals[index] = modifiedMeal;
        else modifiedPlan.meals.push(modifiedMeal);

        submit({ plan: JSON.stringify(modifiedPlan) }, {
            method: "PATCH",
            action: `${location.pathname}`,
        });

        await refetch();

    }, [plan, location.pathname, refetch, submit])

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
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={onBlurTitle}
                    />
                )}
            />
            { plan && (
                <PlanTable 
                    mealTypes={mealTypes}
                    plan={plan}
                    date={date}
                    onChange={onChangePlan}
                />
            )}
        </div>
    );
}

export default Plan; 