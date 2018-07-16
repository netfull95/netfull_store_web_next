import { createSelector } from 'reselect';

const selectUser = state => state;

export const getUser = createSelector(
  selectUser
)