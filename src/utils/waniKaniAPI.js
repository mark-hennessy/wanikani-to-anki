import axios from 'axios';

const waniKaniAPI = axios.create({
  baseURL: 'https://api.wanikani.com/v2',
});

export const setApiKey = key => {
  waniKaniAPI.defaults.headers.common.Authorization = `Bearer ${key}`;
};

export const getSubjectsByTypeAndLevelAsync = async (type, ...levels) => {
  const subjects = [];

  const responseData = (
    await waniKaniAPI.get('/subjects', {
      params: {
        types: type,
        levels: levels?.join(',') || undefined,
      },
    })
  ).data;

  subjects.push(...responseData.data);

  let nextPageUrl = responseData.pages.next_url;
  while (nextPageUrl) {
    const pageResponseData = (await waniKaniAPI.get(nextPageUrl)).data;
    subjects.push(...pageResponseData.data);
    nextPageUrl = pageResponseData.pages.next_url;
  }

  return subjects;
};
