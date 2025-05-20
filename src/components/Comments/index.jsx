import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { TiArrowSortedDown } from "react-icons/ti";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/comments", { params: { id: videoId } })
      .then((res) => setComments(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="my-6">
      {isLoading ? (
        <h1>Yükleniyor</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div>
          <h2 className="text-xl font-bold">{comments.commentsCount} Yorum</h2>

          <input
            type="text"
            placeholder="Yorum ekleyiniz ..."
            className="w-full bg-transparent border-b border-[#3e403f] p-2"
          />

          {/* Comments */}

          {comments.data.map((i, key) => (
            <div
              className="flex gap-2 sm:gap-3 items-start px-1 py-3 sm:py-4"
              key={key}
            >
              <img
                src={i.authorThumbnail[0].url}
                className=" size-8 rounded-full sm:size-10"
                alt="user-picture"
              />

              <div>
                {/* Author Published Time */}
                
                <h5 className="flex gap-2 items-center">
                  <span className="font-bold">{i.authorText} </span>
                  <span className="text-gray-400 text-sm">
                    {i.publishedTimeText}
                  </span>
                </h5>
                {/* Coments */}

                <p className="whitespace-pre-wrap">{i.textDisplay}</p>

                {/* Like & Dislike */}

                <div className="flex items-center gap-5 mt-2">
                  {/* Like */}

                  <div className="flex items-center gap-1 hover:bg-gray-700 cursor-pointer transition duration-300 px-2 py-1 rounded">
                    <AiFillLike />
                    <span>{i.likesCount} </span>
                  </div>
                  {/* DisLike */}

                  <div className="hover:bg-gray-700 cursor-pointer transition duration-300 px-2 py-1 rounded">
                    <AiFillDislike />
                  </div>

                  <span className="hover:bg-gray-700 cursor-pointer transition duration-300 px-2 py-1 rounded">
                    yanıtla
                  </span>
                </div>

                {/* Reply Count */}

                {i.replyCount > 0 && (
                  <div className="mt-2 flex items-center w-fit p-1 rounded-md gap-2 text-blue-500 cursor-pointer hover:bg-[#3e403f] ">
                    <TiArrowSortedDown />
                    {i.replyCount} yanıt
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
