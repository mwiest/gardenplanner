const functions = require("firebase-functions");
const { uuid } = require("uuidv4");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");

exports.resizeImage = functions.storage.object().onFinalize(async object => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  // Exits if the prefix doesn't match
  if (!object.name.match(/plants\//)) {
    return console.log("This is not a plant file.");
  }

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith("image/")) {
    return console.log("This is not an image.");
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith("thumb_")) {
    return console.log("Already a Thumbnail.");
  }

  // Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
    firebaseStorageDownloadTokens: uuid()
  };
  await bucket.file(filePath).download({ destination: tempFilePath });
  console.log("Image downloaded locally to", tempFilePath);
  // Generate a thumbnail using ImageMagick.
  // convert -define jpeg:size=200x200 hatching_orig.jpg  -thumbnail 100x100^ -gravity center - extent 100x100  cut_to_fit.gif
  await spawn("convert", [
    tempFilePath,
    "-thumbnail",
    "75x75^",
    "-gravity",
    "center",
    "-extent",
    "75x75",
    tempFilePath
  ]);
  console.log("Thumbnail created at", tempFilePath);
  // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
  const thumbFileName = `thumb_${fileName}`;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
  // Uploading the thumbnail.
  resp = await bucket.upload(tempFilePath, {
    destination: thumbFilePath,
    metadata: metadata
  });

  // Update thumb property on plant, unfortunately we can't get a public URL from the admin SDK here,
  // clients will listen on that change and use the client SKD to turn it into a public URL :(
  const thumbUriPath = encodeURIComponent(thumbFilePath);
  const thumbUrl = `https://firebasestorage.googleapis.com/v0/b/${fileBucket}/o/${thumbUriPath}?alt=media`;
  const plantRef = admin
    .database()
    .ref("plants/" + fileName.substr(0, fileName.lastIndexOf(".")));
  plantRef.child("thumbUrl").set(thumbUrl);

  // Once the thumbnail has been uploaded delete the local file to free up disk space.
  return fs.unlinkSync(tempFilePath);
});
