export type Review = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: User;
}

export type ServerReview = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: ServerUser;
}

export type User = {
  id: number;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type ServerUser = {
  id: number;
  name: string;
  'avatar_url': string;
  'is_pro': boolean;
}

export type PostedComment = {
  rating: number,
  comment: string,
};


