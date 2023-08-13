import React, { useCallback, useState } from 'react';
import { startOfWeek, eachDayOfInterval, addDays, format } from 'date-fns';
import { MealSlot, getMeal, getMealsForDay } from '@/common/components/MealSlot';
import { PlanModel, MealModel } from '@/common/models';

export interface Options {
    date?: Date,
    mealTypes?: string[]
}

export type PlanTable = Options & {
    plan: PlanModel,
    onChange?: (meal: MealModel) => void
}

export const PlanTable: React.FC<PlanTable> = props => {
    const {
        plan,
        date = new Date,
        onChange,
        mealTypes
    } = props;

    const [firstDay] = useState(startOfWeek(date, { weekStartsOn: 1 }));
    const daysOfWeek = eachDayOfInterval({ start: firstDay, end: addDays(firstDay, 6) });

    const handleChange = useCallback((meal: MealModel) => {
        onChange?.(meal)
    }, [onChange])

    return (
        <div className="table-container">
            <table className="min-w-full">
                <thead className="font-bold text-left">
                    <tr>
                        <th className="px-4 w-8">Date</th>
                        <th className="px-4 w-8">Day</th>
                        <th className="px-4">Meal Plan</th>
                    </tr>
                </thead>
                <tbody>
                {daysOfWeek.map((day) => {
                    const meals = getMealsForDay(day, plan.meals);
                    const dayOfWeek = format(day, 'EEE');
                    const dayOfMonth = format(day, 'd');
                    return (
                        <tr key={dayOfWeek}>
                            <td className="px-4">{dayOfWeek}</td>
                            <td className="px-4">{dayOfMonth}</td>
                            <td className="px-4">

                                {/* If meal types are defined, render meals in order of
                                meal types. */}
                                { mealTypes?.map((type: string) => {
                                    const meal = getMeal(type, meals);
                                    return <MealSlot key={`${dayOfWeek}-${type}`} {...meal}/>;
                                }) }

                                {/* // If meal types are not defined, render all meals for the
                                // day in order of entry. */}
                                { (!mealTypes || mealTypes.length == 0) && (
                                    meals.map((meal, index) => (
                                        <MealSlot
                                            key={`${dayOfWeek}-${index}`}
                                            {...meal}
                                            onChange={handleChange}
                                         />
                                    )
                                )) }
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}
