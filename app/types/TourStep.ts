export type TourStepType = {
  selector: string;
  content: string | React.ReactElement | string | (() => void);
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center' | [number, number];
};
