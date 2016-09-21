import { Map } from 'immutable';
export function combineReducers(updatesMap) {
  return (state = Map(), action) => {
    for (let key in updatesMap) {
      state = state.update(
        key,
        oldData => updatesMap[key](oldData, action)
      );
    }
    return state;
  };
}
