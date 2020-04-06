import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

import { removeJob } from '../actions/jobs';

const JobList = ({ jobs, removeJob }) => {
  const items = Object.values(jobs).map(job => {
    const {
      id, type, title, company, companyUrl,
    } = job;

    return (
      <li key={id}>
        <div className="job-entry">
          <div className="job-entry-type">
            Type:
            { type }
          </div>
          <div className="job-entry-title">{ title }</div>
          <div className="job-entry-company">
            Company:
            <a href={companyUrl}>{ company }</a>
          </div>
          <button type="button" onClick={() => removeJob(id)}>Remove</button>
        </div>
      </li>
    );
  });

  return (<ul>{ items }</ul>);
};

JobList.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  jobs: PropType.object.isRequired,
  removeJob: PropType.func.isRequired,
};

const mapStateToProps = state => ({ jobs: state.jobs });

const mapDispatchToProps = dispatch => ({
  removeJob: id => {
    dispatch(removeJob(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
