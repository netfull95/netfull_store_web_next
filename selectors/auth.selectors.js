import { createSelector } from 'reselect';

const selectAuth = state => state;

export const getAuth = createSelector(
  selectAuth
)