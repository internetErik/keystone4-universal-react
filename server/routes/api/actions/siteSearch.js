
// You can populate this with any results you want to always return
const defaultResults = [];

exports = module.exports = (req, res) => {
  const { search } = req.body;
  const results = searchCache.fuse.search(search);
  res.json({ results, defaultResults });
};
