'use strict';
import keystone from 'keystone';

export function getPost(postid, /* ref */data) {
  return new Promise((resolve, reject) => {
    keystone.list('Post').model.findOne({
        state: 'published',
        slug: postid,
      })
      .populate('author categories')
      .exec(function (err, result) {
        data.post = result;
        resolve();
      });
  });
}

export function getPosts(searchParams, /* ref */data) {
  return new Promise((resolve, reject) => {

    // category passed in by slug/key, so I will lookup id
    if(searchParams.category) {
      keystone.list('Category')
        .model
        .findOne({ key: query.category })
        .exec(handeCategoryResult);
    }
    else {
      //will just lookup the posts
      __getPosts();
    }

    function __handleCategoryResults(err, results) {
      __getPosts(results);
    }

    function __getPosts(category) {
      const q = keystone.list('Post')
        .model
        .find()
        .where('state', 'published');

      if(category) {
        data.category = category.key;
        q.where('categories').in([category._id]);
      }

      q.sort('-publishedDate')
        .populate('author categories')
        .exec(function (err, results) {
          data.posts = results || [];
          //finally resolve after having populated correct data
          resolve();
        });
    }
  });
}
