import { siteSearchCache } from '../../../cache/site-search';

// You can populate this with any results you want to always return
const defaultResults = [];

export const siteSearchController = (req, res) => {
  const { query } = req.body;

  const results = siteSearchCache.search(query);

  res.json({ results, defaultResults });
};
