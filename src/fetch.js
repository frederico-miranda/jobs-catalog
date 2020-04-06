export const fetchJobs = (searchQuery, createJob) => {
  const url = `/positions.json?search=${searchQuery}`;
  const promise = fetch(url, { mode: 'same-origin' });
  promise
    .then(response => response.json())
    .then(json => {
      for (let i = 0; i < json.length; i += 1) {
        const rawJob = json[i];
        createJob(rawJob);
      }
    });
};

export const fetchJob = jobKey => {};
