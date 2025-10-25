import { useState } from 'react';
import type { Food } from '../components/NutriVision.type';

export interface UseCameraResult {
  isAnalyzing: boolean;
  handleCapture: (imageFile: File) => Promise<void>;
  handleReset: () => void;
  detectedFoods: Food[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export function useCamera(): UseCameraResult {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedFoods, setDetectedFoods] = useState<Food[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalFat, setTotalFat] = useState<number>(0);

  // Nhận file ảnh từ CameraFeed component
  const handleCapture = async (imageFile: File) => {
    setIsAnalyzing(true);

    try {
      // Gửi ảnh lên backend để xử lý
      const formData = new FormData();
      formData.append("file", imageFile);

      const res = await fetch("http://localhost:8000/api/v1/capture", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        // Chuẩn hoá dữ liệu trả về từ backend thành Food[]; nếu thiếu id/icon/color thì gán mặc định
        const foods: Food[] = (data?.detected_foods ?? []).map((f: any, idx: number) => ({
          id: f.id ?? idx + 1,
          name: f.name ?? 'Unknown',
          portion: f.portion ?? '',
          calories: Number(f.calories ?? 0),
          protein: Number(f.protein ?? 0),
          carbs: Number(f.carbs ?? 0),
          fat: Number(f.fat ?? 0),
          icon: f.icon ?? 'food',
          color: f.color ?? '#E5E7EB',
        }));
        setDetectedFoods(foods);

        const totalsProvided = typeof data?.total_calories === 'number';
        setTotalCalories(totalsProvided ? data.total_calories : foods.reduce((s, x) => s + (x.calories || 0), 0));
        setTotalProtein(foods.reduce((s, x) => s + (x.protein || 0), 0));
        setTotalCarbs(foods.reduce((s, x) => s + (x.carbs || 0), 0));
        setTotalFat(foods.reduce((s, x) => s + (x.fat || 0), 0));
      } else {
        console.error("Lỗi từ backend:", res.status);
      }
    } catch (error) {
      console.error("Lỗi gửi ảnh:", error);
    }

    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setIsAnalyzing(false);
    setDetectedFoods([]);
    setTotalCalories(0);
    setTotalProtein(0);
    setTotalCarbs(0);
    setTotalFat(0);
  };

  return { isAnalyzing, handleCapture, handleReset, detectedFoods, totalCalories, totalProtein, totalCarbs, totalFat };
}