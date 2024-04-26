const { DataModel } = require("./schema/dataSchema");
const { savedModel, userModel } = require("./schema/userData");

// homeHandler (get)
const homeHandler = async(req,res)=>{

    try {
        res.send("Welcome to Dev'sDev")
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

// Reading API
const readData = async(req,res)=>{

    try {
        const readDatas = await DataModel.find()
        res.status(200).json(readDatas)
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

// Saving Data
const savedData = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userData = await userModel.findOne({ "userId": userId }).populate('likedproducts').exec();
        if (!userData) {
            return res.status(404).json({ message: "User data not found" });
        }
        
        res.status(200).json(userData);

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Reading single data 
const readSingleData = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await DataModel.findOne({ '_id': id });

        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Creating Data
const createData = async(req,res)=>{
    
    try {

        const InputData = req.body

        await DataModel.create(InputData)

        res.status(201).json({data : InputData , message : "Post added successfully"})
        

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

// Creating User 
const createUser = async (req, res) => {
    try {
        const inputData = req.body;
        const { userId } = inputData;

        const existingUser = await userModel.findOne({ 'userId': userId });
        if (existingUser) {
            return res.status(200).json({ data: inputData, message: "User already exists" });
        }

        await userModel.create(inputData);

        return res.status(201).json({ data: inputData, message: "User added successfully" });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


//Saving Data
const saveData = async (req, res) => {
    try {
        const inputData = req.body;
        const { objId , userId} = inputData;

        if (userId && userId) {

            await userModel.updateOne(
                { 'userId': userId },   
                { $push: { likedproducts: objId } }
            );

            return res.status(200).json({ data: inputData, message: " Post saved successfully" });
        }

        return res.status(201).json({ data: inputData, message: "User added successfully" });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Updating Data  
// const updateData = async(req,res)=>{
    
//     try {
//         res.status(200).send("Data updated Successfully")
//     } catch (error) {
//         console.error('Error occurred:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
    
// }

// Updating pfp  
const updatePfp = async (req, res) => {
    const id = req.params.id;
    
    try {
        const { pfp } = req.body;
        // console.log('pfp: ', pfp);
        
        // Ensure that both pfp and username are provided
        if (!pfp || !id) {
            return res.status(400).json({ message: "Both pfp and username are required." });
        }
        
        // Construct the update object to apply partial updates
        const updateObject = {};
        if (pfp) {
            updateObject.pfp = pfp;
        }
        
        // Update the documents matching the username only if pfp has changed
        if (Object.keys(updateObject).length === 0) {
            // No change in pfp, so exit the function without sending any response
            return;
        }
        
        const response = await DataModel.updateMany(
            { userId: id },
            { $set: updateObject }
        );
        
        if (response) {
            return res.status(200).json({ message: "Profile picture updated successfully" });
        } else {
            return res.status(404).send("No data found for the provided username");
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



const deleteData = async (req, res) => {
    const inputData = req.body;

    try {
        const { userId, objId } = inputData;

        const data = await DataModel.findOne({ '_id': objId });

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        await userModel.updateOne(
            { 'userId': userId },
            { $pull: { likedproducts: objId } } // Remove objId from the likedproducts array
        );

        return res.status(200).json({ data: inputData, message: "Post removed successfully" });

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const deletePost = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await DataModel.findOneAndDelete({ '_id': id });

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        return res.status(200).json({ message: "Post removed successfully" });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = {
    
    homeHandler,
    readData,
    createData,
    // updateData,
    readSingleData,
    updatePfp,
    saveData,
    createUser,
    deleteData,
    savedData,
    deletePost

}