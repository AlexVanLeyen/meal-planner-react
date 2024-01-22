import React, { useCallback, useEffect, useRef, useState } from 'react';
import { add, sub } from 'date-fns';
import { mealTypes } from '@/config';
import { PlanTable } from '@/common/components/PlanTable';
import { Navigate, useLocation, useParams, useSubmit } from 'react-router-dom';
import { useMealPlanQuery } from '@/common/hooks/useMealPlanQuery';
import { Loading } from '@/common/components/Loading';
import { Editable } from '@/common/components/Editable';
import { MealModel } from '@/common/models';
import { useDebouncedValue } from '@/common/hooks/useDebouncedValue';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Plan: React.FC = () => {
    const submit = useSubmit();
    const location = useLocation();
    const [ date, setDate ] = useState<string|undefined>();
    const hasMounted = useRef(false);
    const params = useParams();
    const { data: plan, error, isLoading } = useMealPlanQuery(params.identifier ?? "");
    const { meals = [] } = plan ?? {}
    const [ title, setTitle ] = useState("");
    const debouncedTitle = useDebouncedValue(title)

    const onChangePlan = useCallback<(meal: MealModel) => void>(async (modifiedMeal) => {
        const modifiedPlan = { meals };
        const index = meals.findIndex(
            meal => meal.date === modifiedMeal.date && meal.type === modifiedMeal.type
        ) ?? -1
        if (index >= 0) modifiedPlan.meals[index] = modifiedMeal;
        else modifiedPlan.meals.push(modifiedMeal);
        
        submit({ plan: JSON.stringify(modifiedPlan) }, {
            method: "PATCH",
            action: `${location.pathname}`,
        });
    }, [meals, location.pathname, submit])

    const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    useEffect(() => {
        if (isLoading) return
        setTitle(plan?.name ?? "")
    }, [isLoading, plan])

    useEffect(() => {
        if (hasMounted.current === false) return

        const modifiedPlan = { plan: JSON.stringify({ name: debouncedTitle }) };
        submit(modifiedPlan, {
            method: "PATCH",
            action: `${location.pathname}`,
        });
    }, [location.pathname, submit, debouncedTitle])

    useEffect(() => { hasMounted.current = true }, [])

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
            <div className='flex gap-4 justify-between'>
                <Editable
                    className='flex-grow'
                    element={(
                        <h1 className="title">{title || "My Plan"}</h1>
                    )}
                    editElement={(
                        <input
                            autoFocus
                            defaultValue={title} 
                            type="text"
                            className="title"
                            onChange={onChangeTitle}
                        />
                    )}
                />
                <div className='flex gap-1'>
                    <button
                        title='Previous' 
                        className='btn btn-sm'
                        onClick={() => setDate((date) => {
                            const _date = date ? new Date(date) : new Date();
                            return sub(new Date(_date), { weeks: 1 }).toISOString();
                        })
                    }><FaChevronLeft /></button>
                    <button
                        title='Next'
                        className='btn btn-sm'
                        onClick={() => setDate((date) => {
                            const _date = date ? new Date(date) : new Date();
                            return add(_date, { weeks: 1 }).toISOString();
                        })
                    }><FaChevronRight /></button>
                </div>
            </div>
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
