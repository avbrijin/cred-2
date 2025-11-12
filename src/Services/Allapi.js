import { baseurl } from "./Baseurl";
import commonApi from "./CommonApi";

export const gettodo=async()=>{
    return await commonApi('GET',`${baseurl}/todos`,"")
}

export const createtodo=async(reqBody)=>{
    return await commonApi('POST',`${baseurl}/todos`,reqBody)
}

export const deletetodo=async(id)=>{
    return await commonApi('DELETE',`${baseurl}/todos/${id}`,{})
}

export const edittodo=async(id,reqBody)=>{
    return await commonApi('PUT',`${baseurl}/todos/${id}`,reqBody)
}
