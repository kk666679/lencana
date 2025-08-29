import { put, del, list } from "@vercel/blob";

export const uploadFile = async (filename, data, options = {}) => {
  const { url } = await put(filename, data, {
    access: 'public',
    ...options
  });
  return url;
};

export const uploadBadgeImage = async (badgeId, imageFile) => {
  const filename = `badges/${badgeId}.${imageFile.type.split('/')[1]}`;
  return await uploadFile(filename, imageFile);
};

export const uploadUserAvatar = async (userId, imageFile) => {
  const filename = `avatars/${userId}.${imageFile.type.split('/')[1]}`;
  return await uploadFile(filename, imageFile);
};

export const deleteFile = async (url) => {
  await del(url);
};

export const listFiles = async (prefix = '') => {
  const { blobs } = await list({ prefix });
  return blobs;
};