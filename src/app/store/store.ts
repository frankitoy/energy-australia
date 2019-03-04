import { AnyAction } from 'redux';

import { CarShow } from '../shared/models/car-show';

export interface IAppState {
  carShow: CarShow;
  loadingCarShow: boolean;
}

export const INITIAL_STATE: IAppState = {
  carShow: undefined,
  loadingCarShow: false
};

export function rootReducer(lastState: IAppState, action: AnyAction): IAppState {
  switch (action.type) {

    default:
      return lastState;
  }
}
