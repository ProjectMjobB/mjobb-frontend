import {
  FETCHED_POPULAR_CATEGORIES,
  FETCHED_POPULAR_ALL_CATEGORIES,
} from '../actions/CategoryActions';

const initialState = {
  categories: [],
};

export function CategoryReducer(state = initialState, action) {
  if (action.type === FETCHED_POPULAR_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }
  if (action.type === FETCHED_POPULAR_ALL_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }
  return state;
}
