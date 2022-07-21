import {Action, ActionReducer, createReducer, on} from "@ngrx/store";
import {getPage, getPageCategory, getPageSize} from "./post.actions";

export interface PostState {
  page: number;
  pageSize: number;
  pageCategory: number;
}

export const initialPostState: PostState = {
  page: 1,
  pageSize: 10,
  pageCategory: 0,
}

export const postReducer = createReducer(
  initialPostState,
  on(getPage, (state, action) => ({...state, page: state.page})),
  on(getPageSize, (state, action) => ({...state, pageSize: state.pageSize})),
  on(getPageCategory, (state, action) => ({...state, pageCategory: state.pageCategory})),
);
