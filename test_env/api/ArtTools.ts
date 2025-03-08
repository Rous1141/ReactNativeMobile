import axios from 'axios';

const getAllArtToolsURL = process.env.EXPO_PUBLIC_API_GetAll?? null

export const getArtTools = async() =>{
    if(getAllArtToolsURL==null){
        return null;
    }
    else{
        const data = await axios.get(getAllArtToolsURL);
        if(data.status === 200)
        return data.data;
    }
}

export const getArtToolById = async(id:string) =>{
    if(getAllArtToolsURL==null){
        return null;
    }
    else{
        const data = await axios.get(getAllArtToolsURL+`${id}`);
        if(data.status === 200)
        return data.data;
        else
        return null;
    }
}