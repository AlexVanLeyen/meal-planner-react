import React, { useState } from 'react';
import { startOfWeek, eachDayOfInterval, addDays, format } from 'date-fns';
import mealTypes from './mealTypes.json';
import { Plan, Meal, getMeal, getMealsForDay } from '../Meal';

export interface PlanTable {}

export const PlanTable: React.FC<PlanTable> = () => {
    const [plans] = useState<Plan[]>([
        {
            date: new Date('2023-07-03'),
            meals: [
                {
                    type: "breakfast",
                    name: "buttered toast, avacado, omlette",
                    notes: [
                        { message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies a nisi a scelerisque. Mauris et pharetra nulla. Praesent tincidunt libero a nisl dapibus, nec pellentesque neque mattis. Nulla facilisi. Nunc sagittis odio ultrices tellus aliquet, ut aliquet lorem imperdiet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Donec mattis commodo volutpat. In in nisi purus. Nam tempus pulvinar pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent ac iaculis nulla, a luctus sapien. In at sagittis erat." },
                    ]  
                },
                {
                    type: "lunch",
                    name: "spaghetti",
                    notes: []
                },
                {
                    type: "dinner",
                    name: "chicken soup",
                    notes: []

                }
            ]
        },
    ]);
    const [firstDay] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const daysOfWeek = eachDayOfInterval({ start: firstDay, end: addDays(firstDay, 6) });

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
                    const meals = getMealsForDay(day, plans);
                    const dayOfWeek = format(day, 'EEE');
                    const dayOfMonth = format(day, 'd');
                    return (
                        <tr key={dayOfWeek}>
                            <td className="px-4">{dayOfWeek}</td>
                            <td className="px-4">{dayOfMonth}</td>
                            <td className="px-4">
                                { mealTypes.map((type: string) => {
                                    const meal = getMeal(type, meals);
                                    return <Meal key={`${dayOfWeek}-${type}`} {...meal}/>;
                                })}
                            </td>            
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}