import React from 'react';
import PropType from 'prop-types';

const JobList = ({ jobs, removeJob }) => {
  const items = Object.values(jobs).map(job => {
    const {
      id, type, title, company, companyUrl,
    } = job;

    const jobPath = `/jobs/${id}`;

    return (
      <li className="job-list-entry" key={id}>
        <div className="job-entry">
          <div className="job-entry-type">
            Type:
            { type }
          </div>
          <div className="job-entry-title">
            <a href={jobPath}>{ title }</a>
          </div>
          <div className="job-entry-company">
            Company:
            <a href={companyUrl}>{ company }</a>
          </div>
          <button type="button" onClick={() => removeJob(id)}>Remove</button>
        </div>
      </li>
    );
  });

  return (<ul className="jobs-list">{ items }</ul>);
};

JobList.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  jobs: PropType.object.isRequired,
  removeJob: PropType.func.isRequired,
};

export default JobList;
