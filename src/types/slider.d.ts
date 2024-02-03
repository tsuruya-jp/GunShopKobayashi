type SlideItem = {
  id: number;
  content: string;
};

type SliderProps = {
  items: SlideItem[];
  top: boolean;
};