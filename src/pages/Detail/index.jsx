import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import ReactPlayer from "react-player";
import ChannelInfo from "../../components/ChannelInfo";
import Description from "../../components/Description";
import Comments from "../../components/Comments";
import VideoCard from "../../components/VideoCard";
import { BasicLoader } from "../../components/Loader";
import Error from "../../components/Error";
const Detail = () => {

  const [searchParams] = useSearchParams();

  const id = searchParams.get("v");

  const [video, setVideo] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const params = {
      id,
      extend: 1,
    };

    api
      .get("/video/info", { params })
      .then((res) => setVideo(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <BasicLoader />
      ) : error ? (
        <Error info={error} />
      ) : (
        <div className="page-content">
          <div>
            <div className="h-[30vh] md:h-[50vh] lg:h-[60vh] rounded overflow-hidden">
              <ReactPlayer
                height={"100%"}
                width={"100%"}
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
              />
            </div>

            {/* INFO*/}

            <div>
              <h1 className="my-3 text-xl font-bold line-clamp-2">
                {video.title}
              </h1>

              
              <ChannelInfo video={video} />
             
              <Description video={video} />

              <Comments videoId={id} />
            </div>
          </div>

          <div>
            {video?.relatedVideos.data.map((i, key) => (
              <VideoCard key={key} video={i} isRow />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
