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


  } catch (error) {
      console.error("Error:", error);
  }
};


export {saveData , deleteData} ;