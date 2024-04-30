const { default: mongoose } = require("mongoose");
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
        const userData = await userModel.findOne({ "userId": userId }).populate('savedProducts').exec();
        if (!userData) {
            return res.status(404).json({ message: "User data not found" });
        }
        
        res.status(200).json(userData);

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Saving Data
const likedData = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userData = await userModel.findOne({ "userId": userId }).populate('likedProducts').exec();
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
                { $push: { savedProducts: objId } }
            );

            return res.status(200).json({ data: inputData, message: " Post saved successfully" });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//liking Data
const likeData = async (req, res) => {
    try {
        const inputData = req.body;
        const { objId , userId} = inputData;

        if (userId && userId) {

            await userModel.updateOne(
                { 'userId': userId },   
                { $push: { likedProducts : objId } }
            );

            await DataModel.updateOne(
                { "_id": objId },
                { $inc: { likes: 1 } }
            );
            

            return res.status(200).json({ data: inputData, message: " Post liked successfully" });
        }

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


//Saving Data
const addComment = async (req, res) => {

    try {
        const objId = req.params.id
        const {data} = req.body;

        if ( data && objId) {

            await DataModel.updateOne(
                { '_id': objId },
                { $push: { comments: data } }
            );
            

            return res.status(200).json({ data: data, message: " Comment Posted successfully" });
        }else{
            return res.json({ data: data, message: "Network Error" });
        }

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Updating Data  
const updateData = async (req, res) => {
    const id = req.params;
    const inputData = req.body;
    const { objId, title, description, community, data } = inputData;

    try {
        const response = await DataModel.findOne({ "_id": objId });

        if (!response) {
            return res.status(404).send("Data not found");
        }

        // Update fields if they exist in inputData
        if (title) {
            response.title = title;
        }
        if (description) {
            response.description = description;
        }
        if (community) {
            response.community = community; // Corrected field assignment
        }
        if (data) {
            // Concatenate the existing data with the new data
            response.data = [...response.data, ...data];
        }

        // Save the updated document
        await response.save();

        res.status(200).send("Data updated successfully");
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}





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
            { $pull: { savedProducts: objId } } // Remove objId from the likedproducts array
        );

        return res.status(200).json({ data: inputData, message: "Post removed successfully" });

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteLike = async (req, res) => {
    const inputData = req.body;

    try {
        const { userId, objId } = inputData;

        const data = await DataModel.findOne({ '_id': objId });

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        await userModel.updateOne(
            { 'userId': userId },
            { $pull: { likedProducts : objId } }
        );

        await DataModel.updateOne(
            { "_id": objId },
            { $inc: { likes: -1 } }
        );
        

        return res.status(200).json({ data: inputData, message: "Like removed successfully" });

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
    updateData,
    readSingleData,
    updatePfp,
    saveData,
    createUser,
    deleteData,
    savedData,
    deletePost,
    addComment,
    likeData,
    deleteLike,
    likedData,
}