import axios from 'axios'
import {toast} from 'react-toastify'

const saveData = async(objId,userId) =>{
  console.log('userId: ', userId);

    const objData =  new Object();
    objData.userId = userId
    objData.objId = objId
    
    try {
        const response = await axios.post(
          `${import.meta.env.VITE_RENDER_LINK}/api/data/save`,
          objData
        );
        console.log('Response:', response.data);
  
        toast.success(response.data.message);

       return
        
      } catch (error) {

        console.error("Error:", error);
      }
}

const deleteData = async(objId,userId) =>{
  console.log('userId: ', userId);

  
  const objData =  new Object();
  objData.userId = userId
  objData.objId = objId
  
  console.log('objData: ', objData);
  
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_RENDER_LINK}/api/data/delete`,
      objData
    );
    console.log('hello')
        console.log('Response:', response.data);
  
        toast.success(response.data.message);

        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 1000);
        
      } catch (error) {

        console.error("Error:", error);
      }
}

export {saveData , deleteData} ;