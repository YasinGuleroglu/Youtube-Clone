import millify from "millify";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video, isRow }) => {
  const [isHover, setIsHover] = useState(false);

  const thumbnail =
    isHover && video?.richThumbnail?.length
      ? video.richThumbnail.at(1)?.url
      : video?.thumbnail?.length
      ? video.thumbnail.at(1)?.url
      : null;

  return (
    <Link
      to={`/watch?v=${video.videoId}`}
      className={`cursor-pointer ${isRow && "row mt-4"}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Image AreA */}
      <div>
        <img
          src={thumbnail}
          className="rounded-lg w-full h-full"
          alt="card-image"
        />
      </div>

      {/* Info AreA */}
      <div className={`${!isRow && "mt-4"} "flex gap-3"`}>
        {video?.channelThumbnail?.[0]?.url && (
          <img
            src={video.channelThumbnail[0].url}
            className="size-14 rounded-full pp"
            alt="chanel-pic pp"
          />
        )}

        <div>
          <p className="font-bold line-clamp-1 mt-2">{video.title}</p>
          <p className="channel-title">{video.channelTitle}</p>

          <div className="flex gap-3 items-center mt-2">
            <p>
              {millify(Number(video.viewCount))}
              <span className="view">Görüntülenme</span>
            </p>
            *
            {video.isLive ? (
              <p className="bg-red-500 py-0.5 px-2 rounded-lg">Canlı</p>
            ) : (
              <p>{video.publishedTimeText}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
