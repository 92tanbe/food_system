import React from "react";
import { FoodIcon } from "./FoodIcon";
import type { DetectedFoodsProps } from "./DetectedFood.type";

export const DetectedFoods: React.FC<DetectedFoodsProps> = ({
  detectedFoods,
}) => {
  return (
    <section className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-gray-100 border-solid shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="m-0 text-lg font-semibold leading-7 text-gray-800">
          Detected Foods
        </h2>
        <span className="px-3 py-1.5 text-sm font-medium text-emerald-500 bg-emerald-100 rounded-full">
          {detectedFoods.length} items found
        </span>
      </div>
      <div className="overflow-auto w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-solid border-b-gray-100">
              <th className="px-2 py-3.5 text-sm font-medium text-left text-gray-600">
                Food Item
              </th>
              <th className="px-2 py-3.5 text-sm font-medium text-left text-gray-600">
                Calories
              </th>
              <th className="px-2 py-3.5 text-sm font-medium text-left text-gray-600">
                Protein
              </th>
              <th className="px-2 py-3.5 text-sm font-medium text-left text-gray-600">
                Carbs
              </th>
              <th className="px-2 py-3.5 text-sm font-medium text-left text-gray-600">
                Fat
              </th>
            </tr>
          </thead>
          <tbody>
            {detectedFoods?.map((food, index) => (
              <tr
                key={food.id}
                style={{
                  borderTop: index > 0 ? "1px solid #F9FAFB" : "none",
                }}
              >
                <td className="px-2 py-4">
                  <div className="flex gap-3 items-center">
                    <div
                      className="flex justify-center items-center px-3 py-2 w-10 h-10 rounded-lg"
                      style={{
                        background: food.color,
                      }}
                    >
                      <FoodIcon icon={food.icon} />
                    </div>
                    <div>
                      <div className="text-base font-medium leading-6 text-gray-800">
                        {food.name}
                      </div>
                      <div className="text-sm leading-5 text-gray-500">
                        {food.portion}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4">
                  <span className="text-base font-semibold text-gray-800">
                    {food.calories} kcal
                  </span>
                </td>
                <td className="px-2 py-4">
                  <span className="text-base text-gray-600">
                    {food.protein}g
                  </span>
                </td>
                <td className="px-2 py-4">
                  <span className="text-base text-gray-600">{food.carbs}g</span>
                </td>
                <td className="px-2 py-4">
                  <span className="text-base text-gray-600">{food.fat}g</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
