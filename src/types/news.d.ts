type NewsData = {
  id: string;
  title: string;
  content: JsonNullValueInput | InputJsonValue;
  public: boolean;
  createdAt?: Date;
  updatedAt: Date;
};

type NewsArticleProps = {
  news: NewsData[];
};
