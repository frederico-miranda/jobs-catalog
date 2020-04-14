import React from 'react';
import PropType from 'prop-types';

const Filter = ({ setFilter, removeFilter }) => {
  const filterChanged = event => {
    if (event.target.value === '') {
      removeFilter('title');
    } else {
      setFilter('title', event.target.value);
    }
  };

  return (
    <div className="app-filters">
      <div>
        Filter by Title:
        {' '}
        <input type="text" onInput={filterChanged} onChange={filterChanged} />
      </div>
    </div>
  );
};

Filter.propTypes = {
  setFilter: PropType.func.isRequired,
  removeFilter: PropType.func.isRequired,
};

export default Filter;
