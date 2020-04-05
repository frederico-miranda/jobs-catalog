const jobReducer = (action, state) => {
  switch (action.type) {
    case 'CLEAR_JOBS': {
      return { ...state, jobs: {} };
    }

    case 'CREATE_JOB': {
      const job = {
        id: state.id,
        type: state.jobType,
        createdAt: state.createdAt,
        company: state.company,
        companyUrl: state.companyUrl,
        title: state.title,
        description: state.description,
      };

      const nextJobs = { ...state.jobs };
      nextJobs[job.id] = job;

      return { ...state, jobs: nextJobs };
    }

    case 'REMOVE_JOB': {
      const nextJobs = { ...state.jobs };
      delete nextJobs[action.id];

      return { ...state, jobs: nextJobs };
    }

    default:
      return state;
  }
};

export default jobReducer;
