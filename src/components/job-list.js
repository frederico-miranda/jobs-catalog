import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

const JobList = ({ jobs }) => {
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
        </div>
      </li>
    );
  });

  return (<ul>{ items }</ul>);
};

JobList.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  jobs: PropType.object.isRequired,
};

const mapStateToProps = state => ({ jobs: state.jobs });

export default connect(mapStateToProps)(JobList);
