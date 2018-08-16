import keystone from 'keystone';
const Types = keystone.Field.Types;

// const s3FilePath = `${process.env.NODE_ENV}/media-library/`;

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
//     generateFilename: file => file.originalname.replace(/ /g, '-'),
//   },
//   schema: {
//     bucket: true, // optional; store the bucket the file was uploaded to in your db
//     etag: true, // optional; store the etag for the resource
//     path: true, // optional; store the path of the file in your db
//     url: true, // optional; generate & store a public URL
//   },
// });

const MediaItem = new keystone.List('MediaItem', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
});

MediaItem.add({
  name: { type: String, required: true },
  description: { type: String },
  // media: {
  //   type   : Types.File,
  //   storage: s3Storage,
  //   createInline: true,
  //   note   : `Once uploaded, click the blue link above to view the uploaded item.`,
  // },
});

MediaItem.defaultColumns = 'name, media';
MediaItem.register();
