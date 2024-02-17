type NewsData = {
  id: string;
  title: string;
  content: JsonNullValueInput | InputJsonValue;
  public: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

type NewsArticle = {
  data: NewsData[];
};

type NewsArticleProps = {
  data: NewsArticle;
};