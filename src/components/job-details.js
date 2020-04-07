import React from 'react';
import PropType from 'prop-types';

const JobDetails = ({ match }) => {
  return (<div>{`TODO: JobDetails page for key: ${match.params.jobKey}`}</div>);
  /*
  console.log('jobKey: ', jobKey);
  const {
    type,
    createdAt,
    company,
    companyUrl,
    title,
    description,
  } = jobKey;

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
  ); */
};

const mapStateToProps = state => ({ job: state.jobs.selectedJob });

export default JobDetails;
