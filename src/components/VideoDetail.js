import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from ".";

function VideoDetail() {
  const { id: videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetchFromAPI(
      `videos?part=contentDetails,snippet,statistics&id=${videoId}`
    ).then((data) => {
      setVideoData(data.items[0]);
    });
    fetchFromAPI(
      `search?part=snippet&type=video&relatedToVideoId=${videoId}`
    ).then((data) => {
      setVideos(data.items);
    });
  }, [videoId]);

  if (!videoData) {
    return <div>Loading Content...</div>;
  }

  const {
    snippet: { channelId, title, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoData;

  if (!videos?.length) {
    return <p>Loading....</p>;
  }

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls
            />
            <Typography color="#FFF" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#FFF" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#FFF"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;
