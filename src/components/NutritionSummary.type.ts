export interface NutritionSummaryProps {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    onSaveToLog: () => void;
    onExport: () => void;
}