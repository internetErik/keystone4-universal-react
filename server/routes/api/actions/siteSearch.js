import { siteSearchCache } from '../../../cache/site-search';

// You can populate this with any results you want to always return
const defaultResults = [];

exports = module.exports = (req, res) => {
  const { query } = req.body;
  console.log(query);
  const results = siteSearchCache.search(query);

  res.json({ results, defaultResults });
};
