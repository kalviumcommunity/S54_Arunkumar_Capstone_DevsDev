import axios from 'axios'
import {toast} from 'react-toastify'

const saveData = async(objId,userId) =>{


    const saveObjData =  new Object();
    saveObjData.userId = userId
    saveObjData.objId = objId
    
    try {
        const response = await axios.post(
          `${import.meta.env.VITE_RENDER_LINK}/api/data/save`,
          saveObjData
        );

        let savedDatas = localStorage.getItem('savedDatas');
        savedDatas = JSON.parse(savedDatas);

        // Add the new objId to the array
        savedDatas.push(objId);

        // Store the updated array back in localStorage
        localStorage.setItem('savedDatas', JSON.stringify(savedDatas));


       return
        
      } catch (error) {

        console.error("Error:", error);
      }
}

const deleteData = async (objId, userId) => {
  const delObjData = {
      userId: userId,
      objId: objId
  };

  try {
      const response = await axios.delete(
          `${import.meta.env.VITE_RENDER_LINK}/api/data/delete`,
          { data: delObjData }
      );

      let savedDatas = localStorage.getItem('savedDatas');
      savedDatas = savedDatas ? JSON.parse(savedDatas) : [];

      const index = savedDatas.indexOf(objId);
      if (index !== -1) {

        savedDatas.splice(index, 1);

        localStorage.setItem('savedDatas', JSON.stringify(savedDatas));
    }


  } catch (error) {
      console.error("Error:", error);
  }
};


export {saveData , deleteData} ;