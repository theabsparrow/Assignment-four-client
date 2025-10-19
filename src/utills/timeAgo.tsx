export const timeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return `${diff} second${diff !== 1 ? "s" : ""} ago`;
  if (diff < 3600)
    return `${Math.floor(diff / 60)} minute${diff / 60 >= 2 ? "s" : ""} ago`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hour${diff / 3600 >= 2 ? "s" : ""} ago`;
  if (diff < 2592000)
    return `${Math.floor(diff / 86400)} day${diff / 86400 >= 2 ? "s" : ""} ago`;
  if (diff < 31536000)
    return `${Math.floor(diff / 2592000)} month${
      diff / 2592000 >= 2 ? "s" : ""
    } ago`;
  return `${Math.floor(diff / 31536000)} year${
    diff / 31536000 >= 2 ? "s" : ""
  } ago`;
};
