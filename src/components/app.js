import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

import JobList from './job-list';
import Filter from './filter';
import { createJob, removeJob } from '../actions/jobs';
import { setFilter, removeFilter } from '../actions/filter';
import { fetchJobs } from '../fetch';

const initialState = {
  searchQuery: null,
};

const App = ({
  jobs, filter, removeJob, createJob, setFilter, removeFilter,
}) => {
  const [state, setState] = React.useState(initialState);

  const changeSearchQuery = event => {
    setState({ ...state, searchQuery: event.target.value });
  };

  const clickSearchJobs = () => {
    fetchJobs(state.searchQuery, createJob);
  };

  let jobsList = null;

  if (filter.title) {
    jobsList = {};

    const unfilteredJobs = Object.values(jobs);
    for (let i = 0; i < unfilteredJobs.length; i += 1) {
      const job = unfilteredJobs[i];
      if (job.title.indexOf(filter.title) >= 0) {
        jobsList[job.id] = job;
      }
    }
  } else {
    jobsList = jobs;
  }

  return (
    <div className="app-main-box">
      <div className="app-search-box">
        <input type="text" onInput={changeSearchQuery} />
        <button type="button" onClick={clickSearchJobs}>Search Jobs</button>
      </div>
      <Filter setFilter={setFilter} removeFilter={removeFilter} />
      <JobList jobs={jobsList} removeJob={removeJob} />
    </div>
  );
};

App.propTypes = {
  /* eslint-disable-next-line  react/forbid-prop-types */
  jobs: PropType.object.isRequired,
  /* eslint-disable-next-line  react/forbid-prop-types */
  filter: PropType.object.isRequired,
  createJob: PropType.func.isRequired,
  removeJob: PropType.func.isRequired,
  setFilter: PropType.func.isRequired,
  removeFilter: PropType.func.isRequired,
};

const mapStateToProps = state => ({ jobs: state.jobs, filter: state.filter });

const mapDispatchToProps = dispatch => ({
  createJob: rawJob => {
    dispatch(createJob(rawJob));
  },
  removeJob: id => {
    dispatch(removeJob(id));
  },
  setFilter: (filterName, filterValue) => {
    dispatch(setFilter(filterName, filterValue));
  },
  removeFilter: filterName => {
    dispatch(removeFilter(filterName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
