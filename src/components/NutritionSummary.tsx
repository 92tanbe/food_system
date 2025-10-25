import React from "react";
import { NutritionChart } from "./NutritionChart";
import type { NutritionSummaryProps } from "./NutritionSummary.type";

export const NutritionSummary: React.FC<NutritionSummaryProps> = ({
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat,
  onSaveToLog,
  onExport,
}) => {
  return (
    <section className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-gray-100 border-solid shadow-sm">
      <h2 className="m-0 text-lg font-semibold text-gray-800">
        Nutrition Summary
      </h2>
      <div className="flex gap-6 max-sm:flex-col">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex flex-col gap-1 p-4 rounded-xl bg-emerald-500 bg-opacity-10">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Calories</span>
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path
                  d="M4.97813 0.168807C5.22188 -0.0593181 5.6 -0.0561931 5.84375 0.171932C6.70625 0.981307 7.51563 1.85318 8.27188 2.79693C8.61563 2.34693 9.00625 1.85631 9.42813 1.45631C9.675 1.22506 10.0563 1.22506 10.3031 1.45943C11.3844 2.49068 12.3 3.85318 12.9438 5.14693C13.5781 6.42193 14 7.72506 14 8.64381C14 12.6313 10.8813 16.0001 7 16.0001C3.075 16.0001 0 12.6282 0 8.64068C0 7.44068 0.55625 5.97506 1.41875 4.52506C2.29063 3.05318 3.52188 1.51881 4.97813 0.168807ZM7.05312 13.0001C7.84375 13.0001 8.54375 12.7813 9.20312 12.3438C10.5188 11.4251 10.8719 9.58756 10.0813 8.14381C9.94063 7.86256 9.58125 7.84381 9.37813 8.08131L8.59062 8.99693C8.38437 9.23443 8.0125 9.22818 7.81875 8.98131C7.30312 8.32506 6.38125 7.15318 5.85625 6.48756C5.65937 6.23756 5.28437 6.23443 5.08437 6.48443C4.02812 7.81256 3.49688 8.65006 3.49688 9.59068C3.5 11.7313 5.08125 13.0001 7.05312 13.0001Z"
                  fill="#F97316"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {totalCalories} kcal
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col flex-1 items-center">
              <span className="text-lg font-semibold leading-7 text-emerald-500">
                {totalProtein}g
              </span>
              <span className="text-xs text-gray-500">Protein</span>
            </div>
            <div className="flex flex-col flex-1 items-center">
              <span className="text-lg font-semibold leading-7 text-yellow-600">
                {totalCarbs}g
              </span>
              <span className="text-xs text-gray-500">Carbs</span>
            </div>
            <div className="flex flex-col flex-1 items-center">
              <span className="text-lg font-semibold leading-7 text-red-500">
                {totalFat}g
              </span>
              <span className="text-xs text-gray-500">Fat</span>
            </div>
          </div>
        </div>
        <NutritionChart
          totalProtein={totalProtein}
          totalCarbs={totalCarbs}
          totalFat={totalFat}
        />
      </div>
      <div className="flex gap-3 max-sm:flex-col">
        <button
          className="flex-1 px-6 py-3.5 text-base font-medium text-white bg-emerald-500 rounded-xl cursor-pointer border-[none]"
          onClick={onSaveToLog}
        >
          Save to Log
        </button>
        <button
          className="px-6 py-3.5 text-base text-gray-600 bg-gray-100 rounded-xl cursor-pointer border-[none]"
          onClick={onExport}
        >
          Export
        </button>
      </div>
    </section>
  );
};
