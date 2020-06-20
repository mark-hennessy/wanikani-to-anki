import fileDownload from 'js-file-download';

export const downloadFile = (fileName, content) => {
  fileDownload(content, fileName);
};
