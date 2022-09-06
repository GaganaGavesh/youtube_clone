import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

function ChannelDetail() {
  // console.log("channelDetail start");
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  console.log(channelDetail);

  //gives the parameters in the Route that we are currently in
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
      // console.log("fetchFromAPI - 01");
    });
    // console.log("channelDetail - 2", channelDetail);
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        // console.log("fetchFromAPI - 02");
        // console.log("fetchFromAPI - 02 - channelDetail", channelDetail);
        setVideos(data?.items);
        //console.log(data);
      }
    );
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 43%, rgba(252,176,69,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-130px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
}

export default ChannelDetail;
