import { createSelector } from 'reselect';

const selectOrder = state => state;

export const getOrder = createSelector(
  selectOrder
)