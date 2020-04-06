import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

import JobList from './job-list';
import { createJob } from '../actions/jobs';
import { fetchJobs } from '../fetch';

const initialState = {
  searchQuery: null,
};

const App = ({ createJob }) => {
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
      <JobList />
    </div>
  );
};

App.propTypes = {
  createJob: PropType.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createJob: rawJob => {
    dispatch(createJob(rawJob));
  },
});

export default connect(null, mapDispatchToProps)(App);
