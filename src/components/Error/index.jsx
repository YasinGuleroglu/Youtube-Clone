import React from "react";
import { Link } from "react-router-dom";

const Error = ({ info }) => {
  return (
    <div className="bg-red-500 h-fit rounded p-4 flex flex-col gap-6 mx-auto text-center">
      <p>Üzgünüz bir hata oluştu daha sonra tekrar deneyiniz</p>
      <h1 className="font-bold text-xl">{info}</h1>

      <div>
        <Link
          to="/"
          className="border border-transparent px-2 py-3 rounded-md text-md bg-zinc-500 cursor-pointer hover:bg-zinc-600 transition duration-300"
        >
          Ana Sayfaya Gidiniz
        </Link>
      </div>
    </div>
  );
};

export default Error;
