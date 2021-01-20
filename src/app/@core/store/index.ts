import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { User } from '../model/user.model';
import * as fromUser from './user/user.reducer';
import { storageSync } from '@larscom/ngrx-store-storagesync';

export interface RootState {
  user: User;
}

export const reducers: ActionReducerMap<RootState> = {
  user: fromUser.reducer,
};

export function storageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return storageSync<RootState>({
    features: [
      { stateKey: 'user' },
    ],
    storage: window.localStorage,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [storageSyncReducer];

export const selectUserState = createFeatureSelector<User>('user');

export const selectUser = createSelector(selectUserState, (state) => state);