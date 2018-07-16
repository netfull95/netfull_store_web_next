import { createSelector } from 'reselect';

const selectPost = state => state;

export const getPost = createSelector(
  selectPost
)