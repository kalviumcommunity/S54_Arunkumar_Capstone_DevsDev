import React, { useEffect, useState } from 'react';
import nextIcon from '../../assets/next-icon.svg';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

const SavedPage = () => {
  const { user } = useClerk();
  const { id } = user ? user : '';

  const [datas, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (id) {
          const response = await axios.get(`${import.meta.env.VITE_RENDER_LINK}/api/data/saved/${id}`);
          const { likedproducts } = response && response.data;
          setData(likedproducts ? likedproducts : []);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
    {datas.length > 0 ?
    
      <div
      className="grid justify-center grid-cols-2 pt-4 w-full h-screen gap-8 p-2 pb-4 overflow-y-auto"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        overflow: '-moz-scrollbars-none',
      }}
    >
      {datas.slice().reverse().map((data, i) => {
          return (
            <div key={i} className="w-96 bg-[#1E1E1E] rounded-xl h-80 p-4 hover:cursor-pointer">
              <div className="w-full bg-[#181818] rounded-md h-48">
                <img className="w-full h-full rounded-md" src={data.data[0]} alt="Post" />
              </div>
              <div className="flex flex-col justify-between h-24">
                <div className="flex justify-between items-end px-1">
                  <p className="text-xl text-[#d5d5d5] px-1 pt-2 ">{data.title}</p>
                  <span className="textSmall  pr-1">{data.date}</span>
                </div>
                <div className="flex justify-between items-end px-1">
                  <p className="text-sm textSmall px-1">{data.username}</p>
                  <Link to={`/postdetails/${data._id}`}>
                    <img className="h-12 hover:cursor-pointer flex self-end" src={nextIcon} alt="Next" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>

    :
    <p className="text-[#9ca3af] text-xl flex justify-center">No post available</p>
    }
    </>
  );
};

export default SavedPage;
