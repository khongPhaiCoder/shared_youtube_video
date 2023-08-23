export const getYouTubeInfo = async (url: string) => {
  try {
    const videoId = extractVideoId(url);

    const apiUrl = `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

    return await fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const embedId = data.items[0].id;
        const title = data.items[0].snippet.title;
        const thumbnailUrl = data.items[0].snippet.thumbnails.medium.url;

        return { embedId, title, thumbnailUrl };
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  } catch (err) {
    console.log(err);
  }
};

export const extractVideoId = (url: string) => {
  let videoId = "";

  const regExp =
    /^(?:https?:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/))(.*?)(?:\?.*|)$/;
  const match = url.match(regExp);

  if (match && match[1].length === 11) {
    videoId = match[1];
  } else {
    throw new Error("Invalid YouTube URL");
  }

  return videoId;
};
