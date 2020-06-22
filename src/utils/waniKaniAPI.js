import axios from 'axios';

const waniKaniAPI = axios.create({
  baseURL: 'https://api.wanikani.com/v2',
});

export const setApiKey = key => {
  waniKaniAPI.defaults.headers.common.Authorization = `Bearer ${key}`;
};

const getDataAsync = async (url, config) => {
  const data = [];

  const responseData = (
    await waniKaniAPI.get(url, config)
  ).data;

  data.push(...responseData.data);


  let nextPageUrl = responseData.pages.next_url;
  while (nextPageUrl) {
    const pageResponseData = (await waniKaniAPI.get(nextPageUrl)).data;
    data.push(...pageResponseData.data);
    nextPageUrl = pageResponseData.pages.next_url;
  }

  return data;
};

export const getSubjectsAsync = async types => {
  return getDataAsync('/subjects', {
    params: {
      types,
    },
  });
};

export const getStudyMaterialsAsync = async types => {
  return getDataAsync('/study_materials', {
    params: {
      subject_types: types,
    },
  });
};
