'use strict';
import {
  getPost,
  getPosts,
} from '../../data/posts';

exports = module.exports = function (req, res) {

  const postid = req.params.postid;
  const query = req.query;
  const data = {
    post: {},
    posts: [],
    category: null,
  };

  const promises = [ getPosts(query, data) ];

  if(postid)
    promises.push(getPost(postid, data));

  Promise.all(promises)
    .then(() => res.json({ data }));
};
