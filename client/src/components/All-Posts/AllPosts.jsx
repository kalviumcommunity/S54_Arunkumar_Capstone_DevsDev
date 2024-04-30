import React, { useEffect, useState } from "react";
import nextIcon from "../../assets/next-icon.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const AllPosts = () => {
  const { user } = useClerk();
  const { id } = user ? user : "";

  const [datas, setData] = useState([]);
  const [savedDatas, setSavedData] = useState([]);
  const [likedDatas, setLikedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER_LINK}/api/data`
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.removeItem("savedDatas");
    localStorage.removeItem("likedDatas");
    const fetchData = async () => {
      try {
        if (id) {
          const response1 = await axios.get(
            `${import.meta.env.VITE_RENDER_LINK}/api/data/saved/${id}`
          );

          const response2 = await axios.get(
            `${import.meta.env.VITE_RENDER_LINK}/api/data/liked/${id}`
          );

          const { savedProducts } = response1.data;
          const { likedProducts } = response2.data;

          // Extract objId from each object in savedDatas array
          const savedObjIds =
            savedProducts && savedProducts.map((product) => product._id);

          // Extract objId from each object in savedDatas array
          const likedObjIds =
            likedProducts && likedProducts.map((product) => product._id);

          setSavedData(savedObjIds ? savedObjIds : []);

          setLikedData(likedObjIds ? likedObjIds : []);

          localStorage.setItem(
            "savedDatas",
            JSON.stringify(savedObjIds ? savedObjIds : [])
          );

          localStorage.setItem(
            "likedDatas",
            JSON.stringify(likedObjIds ? likedObjIds : [])
          );

        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div
      className="grid justify-center grid-cols-2 pt-4 w-full h-screen gap-8 p-2 pb-4 overflow-y-auto"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflow: "-moz-scrollbars-none",
      }}
    >
      {datas &&
        datas
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
  );
};

export default AllPosts;
