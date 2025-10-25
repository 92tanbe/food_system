export interface Food {
  id: number;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  icon: string;
  color: string;
}

export interface DetectedFoodsProps {
  detectedFoods: Food[];
}
