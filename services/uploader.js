import axios from 'axios';

export const uploadFileRequest = async (
  formData,
  progressCallback
) => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: progressCallback,
    validateStatus: (status) => true,
  };
  const response = await axios.post('/api/uploads', formData, config);

  return response.data;
};