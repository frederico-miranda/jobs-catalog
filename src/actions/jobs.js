export const clearJobs = () => ({
  type: 'CLEAR_JOBS',
});

export const createJob = job => ({
  type: 'CREATE_JOB',
  id: job.id,
  jobType: job.type,
  createdAt: job.created_at,
  company: job.company,
  companyUrl: job.company_url,
  title: job.title,
  description: job.description,
});

export const removeJob = id => ({
  type: 'REMOVE_JOB',
  id,
});
