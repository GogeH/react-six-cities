export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum APIRoute {
  Offers = '/hotels',
  Offer = '/hotels/:id',
  NearbyOffers = 'hotels/:id/nearby',
  FavoriteOffers = '/favorite',
  Comments = '/comments/:id',
  Login = '/login',
  Logout = '/logout',
  ChangeOfferFavorites = '/favorite/:id/:status',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortTypeOffers {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum FavoriteStatus {
  Favorite = 1,
  NotFavorite = 0,
}

export type ValuesOf<T> = T[keyof T];

export type FavoriteStatusType = ValuesOf<typeof FavoriteStatus>;
