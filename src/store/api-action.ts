import { toast } from 'react-toastify';
import { generatePath } from 'react-router-dom';

import { ThunkActionResult } from '../types/action';
import { APIRoute, AppRoute, AuthorizationStatus, FavoriteStatusType } from '../types/enum';
import {
  changeProperty,
  loadOffers, loadOffersFavorites,
  loadOffersNearby,
  loadReviews,
  redirectToRoute,
  requireAuthInfo,
  requireAuthorization,
  requireLogout
} from './action';
import { AuthData } from '../types/types';
import { dropToken, saveToken } from '../services/token';
import { adapterAuthInfoToFrontEnd, adaptOfferToClient, adaptReviewToClient } from '../utils/adapter';
import { ServerOffer } from '../types/offer';
import { PostedComment, ServerReview } from '../types/review';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться!';
const ERROR_DOWNLOAD_OFFERS = 'При загрузке предложений возникли проблемы!';
const ERROR_DOWNLOAD_OFFER = 'При загрузке страницы предложения возникли проблемы!';
const ERROR_DOWNLOAD_COMMENTS = 'При загрузке комментариев к предложению возникли проблемы!';
const ERROR_DOWNLOAD_NEARBY_OFFERS = 'При загрузке похожих предложений возникли проблемы!';
const ERROR_DOWNLOAD_FAVORITE_OFFERS = 'При загрузке избранных предложений возникли проблемы!';
const ERROR_ADD_OR_REMOVE_FAVORITE_OFFER = 'При выборе предложения в избранное или его отмене возникли проблемы!';
const ERROR_SENDING_COMMENT = 'Произошла ошибка при отправке комментария!';
const ERROR_AUTH_ACTION = 'Во время регистрации возникли проблемы, попробуйте авторизироваться через несколько минут!';
const ERROR_EXIT_AUTH_ACTION = 'При выходе из профиля возникли проблемы!';
const SUCCESSFUL_SENDING_COMMENT = 'Спасибо за ваш отзыв!';

const getNameUser = (name: string) => {
  toast.info(`Привет ${name}!!!`);
};

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ServerOffer[]>(APIRoute.Offers);
      const adaptedOffersData = data.map((offer) => adaptOfferToClient(offer));

      dispatch(loadOffers(adaptedOffersData));
    } catch (error) {
      toast.error(ERROR_DOWNLOAD_OFFERS);
    }
  };

export const fetchOffersNearbyAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ServerOffer[]>(generatePath(APIRoute.NearbyOffers.replace(':id', id.toString())));
      const adaptedMoviesData = data.map((offer) => adaptOfferToClient(offer));

      dispatch(loadOffersNearby(adaptedMoviesData));
    } catch (error) {
      toast.error(ERROR_DOWNLOAD_NEARBY_OFFERS);
    }
  };

export const fetchPropertyAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ServerOffer>(generatePath(APIRoute.Offer.replace(':id', id.toString())));
      const adaptedMoviesData =  adaptOfferToClient(data);

      dispatch(changeProperty(adaptedMoviesData));
    } catch (error) {
      toast.error(ERROR_DOWNLOAD_OFFER);
    }
  };

export const fetchOffersFavoritesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ServerOffer[]>(APIRoute.FavoriteOffers);
      const adaptedMoviesData = data.map((offer) => adaptOfferToClient(offer));

      dispatch(loadOffersFavorites(adaptedMoviesData));
    } catch (error) {
      toast.error(ERROR_DOWNLOAD_FAVORITE_OFFERS);
    }
  };

export const fetchFavoritesOffer = (offerId: number, newStatus: FavoriteStatusType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.post(`${APIRoute.FavoriteOffers}/${offerId}/${newStatus}`);
    } catch (error) {
      toast.error(ERROR_ADD_OR_REMOVE_FAVORITE_OFFER);
    }
  };

export const sendComment = (data: { id: number, ratingValue: number, commentValue: string}): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const url = generatePath(APIRoute.Comments.replace(':id', data.id.toString()));

      await api.post<PostedComment>(url, {
        rating: data.ratingValue,
        comment: data.commentValue,
      });
      toast.info(SUCCESSFUL_SENDING_COMMENT);
    } catch (error) {
      toast.error(ERROR_SENDING_COMMENT);
    }
  };

export const fetchReviewsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ServerReview[]>(generatePath(APIRoute.Comments.replace(':id', id.toString())));
      const adaptedReviewData = data.map((review) => adaptReviewToClient(review));

      dispatch(loadReviews(adaptedReviewData));
    } catch (error) {
      toast.error(ERROR_DOWNLOAD_COMMENTS);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get(APIRoute.Login);
      const authData = adapterAuthInfoToFrontEnd(data);

      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(requireAuthInfo(authData));
      getNameUser(authData.name);
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.post(APIRoute.Login, {email, password});
      const authData = adapterAuthInfoToFrontEnd(data);

      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(requireAuthInfo(authData));
      getNameUser(authData.name);
    } catch (error) {
      toast.error(ERROR_AUTH_ACTION);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();

      dispatch(requireLogout());
    } catch (error) {
      toast.error(ERROR_EXIT_AUTH_ACTION);
    }
  };
