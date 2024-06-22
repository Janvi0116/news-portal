import axios from 'axios';

const API_KEY = '63b4e64ae86d43bcb665972e31b51b4a';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

const getNewsData = async ({ searchInput,newsCategory,page = 1,pageSize = 10 }) => {
  try {
    const params = {
      apiKey: API_KEY,
      q: searchInput || undefined,
      category: newsCategory || undefined,
      page : page,
      pageSize : pageSize,
      country:'us'
    };
    // Expected structure {"status" : "ok","totalClicks" : <Number>,"articles" : <Array of articles>}
    const response = await axios.get(BASE_URL, { params }) 
    if (response.data.status !== 'ok') {
      throw new Error('Failed to fetch news');
    }
    return {
      articles: response.data.articles,
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export { getNewsData };


