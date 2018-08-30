import keystone from 'keystone';
const Types = keystone.Field.Types;

// const s3FilePath = `${process.env.NODE_ENV}/home-page/`;

// const s3Storage = new keystone.Storage({
//   adapter: require('keystone-storage-adapter-s3'),
//   s3: {
//     key: process.env.S3_KEY,
//     secret: process.env.S3_SECRET,
//     bucket: process.env.S3_BUCKET,
//     region: process.env.S3_REGION,
//     path: s3FilePath,
//     uploadParams: {
//       ACL: 'public-read',
//     },
//     publicUrl : file => `https:${process.env.S3_BASE_URL}${s3FilePath}${file.filename}`,
//     schema: {
//       bucket: true, // optional; store the bucket the file was uploaded to in your db
//       etag: true, // optional; store the etag for the resource
//       path: true, // optional; store the path of the file in your db
//       url: true, // optional; generate & store a public URL
//     },
//   },
// });

const HomePage = new keystone.List('HomePage', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  nocreate: !(process.env.NODE_ENV === 'dev' || process.env.CAN_CREATE_PAGES === 'true'),
  nodelete: true
});

HomePage.add({
  title: { type: String, required: true },
  meta: { type: String },
});

HomePage.defaultColumns = 'title';
HomePage.register();
