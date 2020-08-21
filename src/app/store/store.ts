import { AnyAction } from 'redux';

import { CarShow } from '../shared/models/car-show';
import { CarShowActions } from '../actions/car-show.actions';

export interface IAppState {
  carShows: CarShow;
  loadingCarShow: boolean;
  notification: string;
}

export const INITIAL_STATE: IAppState = {
  carShows: undefined,
  loadingCarShow: false,
  notification: undefined
};

export function rootReducer(lastState: IAppState, action: AnyAction): IAppState {
  switch (action.type) {

    case CarShowActions.GET_CAR_SHOW_START:
      return Object.assign({}, lastState, { loadingCarShow: true });

    case CarShowActions.GET_CAR_SHOW_RESOLVE:
      return Object.assign({}, lastState, { loadingCarShow: false, carShows: action.payload });

    case CarShowActions.GET_CAR_SHOW_ERROR:
      return Object.assign({}, lastState, { loadingCarShow: true, notification: action.payload });

    case CarShowActions.GET_CAR_SHOW_END:
      return Object.assign({}, lastState, { loadingCarShow: false });

    default:
      return lastState;
  }
}
