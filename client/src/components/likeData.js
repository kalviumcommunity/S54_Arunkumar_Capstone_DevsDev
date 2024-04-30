import axios from 'axios'
import {toast} from 'react-toastify'

const likeData = async(objId,userId) =>{

    const likeObjData =  new Object();
    likeObjData.userId = userId
    likeObjData.objId = objId
    console.log('likeObjData: ', likeObjData);
    
    try {
        const response = await axios.post(
          `${import.meta.env.VITE_RENDER_LINK}/api/data/like`,
          likeObjData
        );

        let likedDatas = localStorage.getItem('likedDatas');
        likedDatas = JSON.parse(likedDatas);

        // Add the new objId to the array
        likedDatas.push(objId);

        // Store the updated array back in localStorage
        localStorage.setItem('likedDatas', JSON.stringify(likedDatas));


       return
        
      } catch (error) {

        console.error("Error:", error);
      }
}

const deleteLikeData = async (objId, userId) => {

  const delObjData = {
      userId: userId,
      objId: objId
  };

  try {
      const response = await axios.delete(
          `${import.meta.env.VITE_RENDER_LINK}/api/data/like/delete`,
          { data: delObjData }
      );

      let likedDatas = localStorage.getItem('likedDatas');
      likedDatas = likedDatas ? JSON.parse(likedDatas) : [];

      const index = likedDatas.indexOf(objId);
      if (index !== -1) {

        likedDatas.splice(index, 1);

        localStorage.setItem('likedDatas', JSON.stringify(likedDatas));
    }


  } catch (error) {
      console.error("Error:", error);
  }
};


export {likeData , deleteLikeData} ;