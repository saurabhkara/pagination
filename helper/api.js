import axios from "axios";

const fetchStory = async (page) => {
  console.log("page",page);
  return axios.get(
    `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
  );
};

export default fetchStory;
