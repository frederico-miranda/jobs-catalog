const initialState = {};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_JOBS': {
      return ({});
    }

    case 'CREATE_JOB': {
      const job = {
        id: action.id,
        type: action.jobType,
        createdAt: action.createdAt,
        company: action.company,
        companyUrl: action.companyUrl,
        title: action.title,
        description: action.description,
      };

      const nextJobs = { ...state };
      nextJobs[job.id] = job;

      return nextJobs;
    }

    case 'REMOVE_JOB': {
      const nextJobs = { ...state };
      delete nextJobs[action.id];

      return nextJobs;
    }

    default:
      return state;
  }
};

export default jobsReducer;
