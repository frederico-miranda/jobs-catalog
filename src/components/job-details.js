import React from 'react';
import PropType from 'prop-types';

import { fetchJob } from '../fetch';

const jobState = null;

const JobDetails = ({ match }) => {
  const { jobKey } = match.params;

  const [job, setJob] = React.useState(jobState);

  React.useEffect(() => {
    if (job === null) {
      const promise = fetchJob(jobKey);
      promise.then(job => setJob(job));
    }
  });

  if (job === null) {
    return (<div>Loading...</div>);
  }

  const {
    type,
    createdAt,
    company,
    companyUrl,
    title,
    description,
  } = job;

  const descriptionNode = document.createElement('div');
  descriptionNode.classList.add('job-details-description');
  descriptionNode.innerHTML = description;

  return (
    <div ref={node => node.appendChild(descriptionNode)}>
      <div className="job-details-type">
        Type:
        { type }
      </div>
      <div className="job-details-date">
        Creation Date:
        { createdAt }
      </div>
      <div className="job-details-company">
        Company:
        <a href={companyUrl}>{ company }</a>
      </div>
      <div className="job-details-title">
        Title:
        { title }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ job: state.jobs.selectedJob });

export default JobDetails;
