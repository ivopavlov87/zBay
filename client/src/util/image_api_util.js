import axios from "axios";

export const uploadImage = imageObj => {
  return axios.post("/images", imageObj);
};

export const getImages = () => {
  return axios.get('/images')
};