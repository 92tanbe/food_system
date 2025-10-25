"use client";
import React, { useState } from "react";
import { Header } from "./Header";
import { CameraFeed } from "./CameraFeed";
import { DetectedFoods } from "./DetectedFoods";
import { NutritionSummary } from "./NutritionSummary";
import { useCamera } from '../hooks/useCamera';


export const NutriVision: React.FC = () => {
  // Nhận dữ liệu thực từ hook thay vì dữ liệu mẫu
  const {
    isAnalyzing,
    handleCapture,
    handleReset,
    detectedFoods,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
  } = useCamera();

  const [isLiveFeedActive] = useState(true);


  // const handleReset = () => {
  //   setDetectedFoods([]);
  //   setTotalCalories(0);
  //   setTotalProtein(0);
  //   setTotalCarbs(0);
  //   setTotalFat(0);

  // };

  const handleSaveToLog = () => {
    console.log("Saving to log:", {
      detectedFoods,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    });
  };

  const handleExport = () => {
    console.log("Exporting data:", {
      detectedFoods,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLiveFeedActive={isLiveFeedActive} />
      <main className="flex gap-6 justify-center items-start p-6 w-full max-md:flex-col max-md:items-center">
        <div className="flex flex-col items-center max-w-full w-[684px]">
          <CameraFeed
            isAnalyzing={isAnalyzing}
            onCapture={handleCapture}
            onReset={handleReset}
          />
        </div>
        <div className="flex flex-col gap-6 max-w-full w-[684px]">
          <DetectedFoods detectedFoods={detectedFoods} />
          <NutritionSummary
            totalCalories={totalCalories}
            totalProtein={totalProtein}
            totalCarbs={totalCarbs}
            totalFat={totalFat}
            onSaveToLog={handleSaveToLog}
            onExport={handleExport}
          />
        </div>
      </main>
    </div>
  );
};

export default NutriVision;
