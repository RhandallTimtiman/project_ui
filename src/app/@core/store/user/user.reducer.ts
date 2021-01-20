import { User } from 'app/@core/model/user.model';
import { UserActions, UserActionTypes } from './user.action';

export const initialState: User = null;
export function reducer(state = initialState, action: UserActions): User {
  switch (action.type) {
    case UserActionTypes.SetUser:
      state = action.payload
      return state;
    case UserActionTypes.RemoveUser:
      state = initialState;
      return state;
    default:
      return state;
  }
}
