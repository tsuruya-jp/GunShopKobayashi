type NewsData = {
  id: string;
  title: string;
  content: JsonNullValueInput | InputJsonValue;
  public: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type NewsArticle = {
  data: NewsData[];
};

type NewsArticleProps = {
  data: NewsArticle;
};