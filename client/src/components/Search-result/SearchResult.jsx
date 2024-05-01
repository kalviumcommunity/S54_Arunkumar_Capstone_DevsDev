import React, { useEffect, useState } from "react";
import nextIcon from "../../assets/next-icon.svg";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const SearchResult = () => {
  const { user } = useClerk();
  const { id } = user ? user : "";

  const location = useLocation();
  const datas = location.state;

  return (
    <>
      <div className="hover:cursor-default">
        <span className="bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] text-transparent bg-clip-text text-2xl font-semibold">
          Search Results
        </span>
      </div>
      {datas && datas.length > 0 ?
    <div
      className="grid justify-center grid-cols-2 pt-4 w-full h-screen gap-8 p-2 pb-4 overflow-y-auto"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflow: "-moz-scrollbars-none",
      }}
    >
      {datas
        .slice()
        .reverse()
        .map((data, i) => {
          return (
            <div
              key={i}
              className="w-96 bg-[#1E1E1E] rounded-xl h-80 p-4 hover:cursor-pointer"
            >
              <div className="w-full bg-[#181818] rounded-md h-48">
                <img
                  className="w-full h-full rounded-md"
                  src={data.data[0]}
                  alt="Post"
                />
              </div>
              <div className="flex flex-col justify-between h-24">
                <div className="flex justify-between items-end px-1">
                  <p className="text-lg text-[#d5d5d5] pt-2 ">
                    {data.title.length > 25
                      ? `${data.title.slice(0, 20)}...`
                      : data.title}
                  </p>
                  <span className="textSmall ">{data.date}</span>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-sm textSmall">{data.username}</p>
                  <Link to={`/postdetails/${data._id}`}>
                    <img
                      className="h-12 hover:cursor-pointer flex self-end"
                      src={nextIcon}
                      alt="Next"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
    :
    <p className="text-center">No results found</p>
}    
</>
  );
};

export default SearchResult;
