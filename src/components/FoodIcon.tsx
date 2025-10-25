import React from "react";
import type { FoodIconProps } from "./FoodIcon.type";

export const FoodIcon: React.FC<FoodIconProps> = ({ icon }) => {
  const getIcon = () => {
    switch (icon) {
      case "chicken":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2C6.5 2 5.5 3 5.5 4.5C5.5 5.5 6 6.5 7 7L6 8C5.5 8.5 5.5 9.5 6 10L7 11C7.5 11.5 8.5 11.5 9 11L10 10C10.5 9.5 10.5 8.5 10 8L9 7C10 6.5 10.5 5.5 10.5 4.5C10.5 3 9.5 2 8 2Z"
              fill="#F97316"
            />
          </svg>
        );
      case "salad":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1C6 1 4.5 2.5 4.5 4.5C4.5 5.5 5 6.5 6 7C5 7.5 4.5 8.5 4.5 9.5C4.5 11.5 6 13 8 13C10 13 11.5 11.5 11.5 9.5C11.5 8.5 11 7.5 10 7C11 6.5 11.5 5.5 11.5 4.5C11.5 2.5 10 1 8 1Z"
              fill="#10B981"
            />
          </svg>
        );
      case "rice":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 4C3 3.5 3.5 3 4 3H12C12.5 3 13 3.5 13 4V12C13 12.5 12.5 13 12 13H4C3.5 13 3 12.5 3 12V4ZM5 5V11H11V5H5Z"
              fill="#F59E0B"
            />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2C6.5 2 5.5 3 5.5 4.5C5.5 5.5 6 6.5 7 7L6 8C5.5 8.5 5.5 9.5 6 10L7 11C7.5 11.5 8.5 11.5 9 11L10 10C10.5 9.5 10.5 8.5 10 8L9 7C10 6.5 10.5 5.5 10.5 4.5C10.5 3 9.5 2 8 2Z"
              fill="#6B7280"
            />
          </svg>
        );
    }
  };

  return getIcon();
};
