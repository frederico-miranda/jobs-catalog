import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

import JobList from './job-list';
import { createJob, removeJob } from '../actions/jobs';
import { fetchJobs } from '../fetch';

const initialState = {
  searchQuery: null,
};

const App = ({ jobs, removeJob, createJob }) => {
  const [state, setState] = React.useState(initialState);

  const changeSearchQuery = event => {
    setState({ ...state, searchQuery: event.target.value });
  };

  const clickSearchJobs = () => {
    fetchJobs(state.searchQuery, createJob);
  };

  return (
    <div className="app-main-box">
      <div className="app-search-box">
        <input type="text" onInput={changeSearchQuery} />
        <button type="button" onClick={clickSearchJobs}>Search Jobs</button>
      </div>
      <JobList jobs={jobs} removeJob={removeJob} />
    </div>
  );
};

App.propTypes = {
  jobs: PropType.object.isRequired,
  createJob: PropType.func.isRequired,
  removeJob: PropType.func.isRequired,
};

const mapStateToProps = state => ({ jobs: state.jobs });

const mapDispatchToProps = dispatch => ({
  createJob: rawJob => {
    dispatch(createJob(rawJob));
  },
  removeJob: id => {
    dispatch(removeJob(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
