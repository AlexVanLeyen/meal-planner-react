import React, { useMemo } from "react";
import { startOfWeek, eachDayOfInterval, addDays, format } from "date-fns";
import { MealSlot } from "@/common/components/MealSlot";
import { getMeal, getMealsForDay } from "@/common/models/PlanModel";
import { PlanModel, MealModel } from "@/common/models";

export type MealType = {
  key: string;
  label?: string;
};

export interface Options {
  date?: Date | string;
  mealTypes?: MealType[];
}

export type PlanTable = Options & {
  plan?: PlanModel;
  onChange?: (meal: MealModel) => void;
};

function createPlan(): PlanModel {
  return {
    name: "",
    description: "",
    author: {
      name: "",
    },
    meals: [],
  };
}

export const PlanTable: React.FC<PlanTable> = (props) => {
  const {
    plan = createPlan(),
    date = new Date().toISOString(),
    onChange,
    mealTypes,
  } = props;

  const firstDay = useMemo(
    () => startOfWeek(new Date(date), { weekStartsOn: 1 }),
    [date],
  );
  const daysOfWeek = eachDayOfInterval({
    start: firstDay,
    end: addDays(firstDay, 6),
  });

  return (
    <div className="table-container">
      <table className="min-w-full">
        <thead className="font-bold text-left">
          <tr>
            <th className="px-4 w-8">Date</th>
            <th className="px-4">Meal Plan</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => {
            const meals = getMealsForDay(day.toISOString(), plan.meals);
            const mealDate = format(day, "EEE d");

            return (
              <tr key={mealDate}>
                <td className="px-4 whitespace-nowrap">{mealDate}</td>
                <td className="px-4">
                  {// If meal types are defined, render meals in order of
                  // meal types.
                  mealTypes?.map((type: MealType) => {
                    const meal = getMeal(type.key, meals) ?? {
                      type: type.key,
                      date: new Date(day).toISOString(),
                      name: "",
                      note: { message: "" },
                    };
                    return (
                      <MealSlot
                        key={`${mealDate}-${type.key}`}
                        placeholder={type.label}
                        {...meal}
                        onChange={onChange}
                      />
                    );
                  })}

                  {
                    // If meal types are not defined, render all meals for the
                    // day in order of entry
                    (!mealTypes || mealTypes.length == 0) &&
                      meals.map((meal, index) => (
                        <MealSlot
                          key={`${mealDate}-${index}`}
                          {...meal}
                          onChange={onChange}
                        />
                      ))
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
