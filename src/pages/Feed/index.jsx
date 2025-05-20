import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import VideoCard from "../../components/VideoCard";
import { SkeletonLoader } from "../../components/Loader";
import Error from "../../components/Error";

const Feed = () => {
  // statte
  let [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params] = useSearchParams();
  const selectedCategory = params.get("category");

  // ! Sayfa yüklendiğinde api at
  useEffect(() => {
    // Api isteği atılacak url'i belirle
    const url = !selectedCategory
      ? "/home"
      : selectedCategory === "trending"
      ? "/trending"
      : `/search?query=${selectedCategory}`;

    //   !     Api isteği at
    api
      .get(url)
      .then((res) => setVideos(res.data.data)) 
      .catch((err) => setError(err.message)) 
      .finally(() => setIsLoading(false)); 
  }, [selectedCategory]);

  videos = videos.filter((video) => video.type === "video");

  return (
    <div className="flex">
      <Sidebar selectedCategory={selectedCategory} />
      <div className="videos ">
        {/* isloading ise yükleniyor hata varsa  videoları maple */}
        {isLoading ? (
          <SkeletonLoader />
        ) : error ? (
          <Error info={error} />
        ) : (
          videos.map((video, key) => <VideoCard key={key} video={video} />)
        )}
      </div>
    </div>
  );
};


export default Feed;
