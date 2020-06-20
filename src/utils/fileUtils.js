import fileDownload from 'js-file-download';

export const readFile = async filePath => {
  const fetchResult = await fetch(filePath);
  const string = await fetchResult.text();
  return string;
};

export const downloadFile = (fileName, content) => {
  fileDownload(content, fileName);
};
