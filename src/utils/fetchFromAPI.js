import axios from "axios";

const BaseURL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    // relatedToVideoId: "7ghhRHRP6t4",
    // part: "id,snippet",
    // type: "video",
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": "6e8830e470mshd1d5fedd05e6364p125bb5jsn1bcb7dc5a11d",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BaseURL}/${url}`, options);

  return data;
};

//Store the Rapid API key in our Environment variables
