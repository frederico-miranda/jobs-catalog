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

export const fetchJob = jobKey => {
  const fetchPromise = new Promise((resolve, reject) => {
    const url = `/positions/${jobKey}.json`;
    const promise = fetch(url, { mode: 'same-origin' });
    promise
      .then(response => response.json())
      .then(json => {
        const job = {
          id: json.id,
          type: json.type,
          createdAt: json.created_at,
          company: json.company,
          companyUrl: json.company_url,
          title: json.title,
          description: json.description,
        };

        resolve(job);
      })
      .catch(error => reject(error));
  });

  return fetchPromise;
};
