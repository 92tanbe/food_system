export interface CameraFeedProps {
  isAnalyzing: boolean;
  onCapture: (imageFile: File) => void | Promise<void>;
  onReset: () => void;
}
