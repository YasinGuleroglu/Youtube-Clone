import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import VideoCard from "../../components/VideoCard";
import { BasicLoader } from "../../components/Loader";
import Error from "../../components/Error";

const Results = () => {
  let [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("search_query");

  const params = {
    query,
    token: page > 1 ? token : null,
  };

  // ! Api isteği att
  useEffect(() => {
    api
      .get("/search", { params })
      .then((res) => {
        console.log(res);

        setVideos((prev) => [...prev, ...res.data.data]),
          setToken(res.data.continuation);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);


  videos.data = videos.data?.filter((video) => video.type === "video");

  return (
    <div className="p-4 sm:p-6 md:p-10 h-[93vh] overflow-y-auto results ">
      {isLoading ? (
        <BasicLoader />
      ) : error ? (
        <Error info={error} />
      ) : (
        <>
          <h2 className="text-2xl">
            <span className="font-bold">{query}</span> için sonuçlar
          </h2>
          {videos.map((i, key) => (
            <VideoCard key={key} video={i} isRow />
          ))}

          <div className="flex justify-center">
            <button
              onClick={() => setPage(page + 1)}
              className="bg-zinc-600 py-2 px-5 rounded-md my-10 cursor-pointer hover:bg-zinc-800 transition duration-300"
            >
              Daha Fazla
            </button>
            
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
