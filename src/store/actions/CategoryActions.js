import {
  fetchPopularCategories,
  fetchPopularAllCategories,
} from '../../services/CategoryServise';

export const FETCHED_POPULAR_CATEGORIES =
  '[fetch popular categories] success fetch';
export const FAILED_POPULAR_CATEGORIES =
  '[failed popular categories] failed fetch';
export const FETCHED_POPULAR_ALL_CATEGORIES =
  '[fetch popular all categories] success fetch';
export const FAILED_POPULAR_ALL_CATEGORIES =
  '[failed popular ALL categories] failed fetch';
export function fetchPopularCategoryAction() {
  return (dispatch) => {
    fetchPopularCategories()
      .then((response) => {
        dispatch(fetchedPopularCategories(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchPopularAllCategoryAction() {
  return (dispatch) => {
    fetchPopularAllCategories()
      .then((response) => {
        dispatch(fetchedPopularAllCategories(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchedPopularCategories(data) {
  return {
    type: FETCHED_POPULAR_CATEGORIES,
    payload: data,
  };
}
export function fetchedPopularAllCategories(data) {
  return {
    type: FETCHED_POPULAR_ALL_CATEGORIES,
    payload: data,
  };
}

export function failedPopularCategories(data) {
  return {
    type: FAILED_POPULAR_CATEGORIES,
    payload: data,
  };
}

// FETCHED_POPULAR_CATEGORIES
