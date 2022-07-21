export interface PostStates {
  page: number;
  pageSize: number;
  pageCategory: number;
}

export const initialPostState: PostStates = {
  page: 1,
  pageSize: 10,
  pageCategory: 0,
}
