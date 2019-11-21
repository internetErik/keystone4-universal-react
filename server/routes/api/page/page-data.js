import populateData from '../../../data';

export const pageDataController = (req, res) => {
  // get the path as an array, ignoring the first two parts ('api' and 'page')
  let [_, __, pagePath, ...args] = req.path.split('/').splice(1);
  // populate the data using the same methods as a server side render
  populateData(pagePath, args, req, res)
    .then(data => res.json({ data }));
};