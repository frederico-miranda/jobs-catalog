export const clearFilters = () => ({
  type: 'CLEAR_FILTERS',
});

export const setFilter = (filterName, filterValue) => ({
  type: 'SET_FILTER',
  filterName,
  filterValue,
});

export const removeFilter = filterName => ({
  type: 'REMOVE_FILTER',
  filterName,
});
