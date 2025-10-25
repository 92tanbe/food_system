import React, { useRef } from "react";
import type { CameraFeedProps } from "./CameraFeed.type";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const CameraFeed: React.FC<CameraFeedProps> = ({
  isAnalyzing,
  onCapture,
  onReset,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCaptureClick = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    
    if (img && canvas) {
      // Đặt kích thước canvas bằng kích thước ảnh thực
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Vẽ frame hiện tại từ img lên canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Chuyển canvas thành blob JPEG
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
            onCapture(file); // Gọi hàm xử lý từ props
          }
        }, "image/jpeg", 0.9); // quality = 0.9
      }
    }
  };

  return (
    <section className="flex flex-col gap-4 p-6 w-full bg-white rounded-2xl border border-gray-100 border-solid shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="m-0 text-lg font-semibold leading-7 text-gray-800">
          Live Camera Feed
        </h2>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">ESP32 Camera</span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        </div>
      </div>
      
      <div className="overflow-hidden relative w-full bg-gray-900 rounded-xl h-[357px]">
        <img
          ref={imgRef}
          src={`${backendUrl}/api/v1/video_feed`}
          alt="Live camera feed"
          className="object-cover size-full"
          crossOrigin="anonymous" // Cho phép canvas vẽ từ img
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        
        <div className="flex absolute top-4 left-4 gap-2 items-center px-3 py-1.5 rounded-lg bg-black bg-opacity-50">
          <svg width="16" height="14" viewBox="0 0 16 15" fill="none">
            <path
              d="M0 4.25C0 3.28477 0.784766 2.5 1.75 2.5H8.75C9.71523 2.5 10.5 3.28477 10.5 4.25V11.25C10.5 12.2152 9.71523 13 8.75 13H1.75C0.784766 13 0 12.2152 0 11.25V4.25ZM15.2879 3.47891C15.5723 3.63203 15.75 3.92734 15.75 4.25V11.25C15.75 11.5727 15.5723 11.868 15.2879 12.0211C15.0035 12.1742 14.659 12.1578 14.3883 11.9773L11.7633 10.2273L11.375 9.96758V9.5V6V5.53242L11.7633 5.27266L14.3883 3.52266C14.6562 3.34492 15.0008 3.32578 15.2879 3.47891Z"
              fill="white"
            />
          </svg>
          <span className="text-sm text-white">1080p • 30fps</span>
        </div>
        
        {isAnalyzing && (
          <div className="absolute right-4 bottom-4 px-3 py-1.5 bg-emerald-500 rounded-lg">
            <span className="text-sm font-medium text-white">Analyzing...</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-3 justify-center items-center">
        <button
          className="flex gap-2 items-center px-4 py-2 text-base text-white bg-emerald-500 rounded-lg cursor-pointer border-[none]"
          onClick={handleCaptureClick}
          disabled={isAnalyzing}
        >
          <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
            <path
              d="M5.33125 2.65L5.00625 3.625H2.67188C1.56875 3.625 0.671875 4.52187 0.671875 5.625V13.625C0.671875 14.7281 1.56875 15.625 2.67188 15.625H14.6719C15.775 15.625 16.6719 14.7281 16.6719 13.625V5.625C16.6719 4.52187 15.775 3.625 14.6719 3.625H12.3375L12.0125 2.65C11.8094 2.0375 11.2375 1.625 10.5906 1.625H6.75313C6.10625 1.625 5.53438 2.0375 5.33125 2.65ZM8.67188 6.625C9.46752 6.625 10.2306 6.94107 10.7932 7.50368C11.3558 8.06629 11.6719 8.82935 11.6719 9.625C11.6719 10.4206 11.3558 11.1837 10.7932 11.7463C10.2306 12.3089 9.46752 12.625 8.67188 12.625C7.87623 12.625 7.11316 12.3089 6.55055 11.7463C5.98795 11.1837 5.67188 10.4206 5.67188 9.625C5.67188 8.82935 5.98795 8.06629 6.55055 7.50368C7.11316 6.94107 7.87623 6.625 8.67188 6.625Z"
              fill="white"
            />
          </svg>
          Capture
        </button>
        <button
          className="flex gap-2 items-center px-4 py-2 text-base text-gray-600 bg-gray-100 rounded-lg cursor-pointer border-[none]"
          onClick={onReset}
          disabled={isAnalyzing}
        >
          <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
            <path
              d="M15.4062 7.62498H15.6719C16.0875 7.62498 16.4219 7.2906 16.4219 6.87498V2.87498C16.4219 2.57185 16.2406 2.29685 15.9594 2.18123C15.6781 2.0656 15.3562 2.1281 15.1406 2.34373L13.8406 3.64373C11.1031 0.940605 6.69374 0.94998 3.97186 3.67498C1.23749 6.40935 1.23749 10.8406 3.97186 13.575C6.70624 16.3094 11.1375 16.3094 13.8719 13.575C14.2625 13.1844 14.2625 12.55 13.8719 12.1594C13.4812 11.7687 12.8469 11.7687 12.4562 12.1594C10.5031 14.1125 7.33749 14.1125 5.38436 12.1594C3.43124 10.2062 3.43124 7.0406 5.38436 5.08748C7.32811 3.14373 10.4687 3.13435 12.425 5.05623L11.1406 6.34373C10.925 6.55935 10.8625 6.88123 10.9781 7.16248C11.0937 7.44373 11.3687 7.62498 11.6719 7.62498H15.4062Z"
              fill="#4B5563"
            />
          </svg>
          Reset
        </button>
      </div>
    </section>
  );
};