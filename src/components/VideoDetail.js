import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { fetchFromAPI } from "../utils/fetchFromAPI";

function VideoDetail() {
  const { id: videoId } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    fetchFromAPI(
      `videos?part=contentDetails,snippet,statistics&id=${videoId}`
    ).then((data) => {
      setVideoData(data.items[0]);
    });
  }, [videoId]);

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
              {videoData.snippet.title}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;
