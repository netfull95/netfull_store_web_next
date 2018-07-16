import { createSelector } from 'reselect';

const selectProduct = state => state;

export const getProduct = createSelector(
  selectProduct
)