import { config } from "../config/config.js";
const baseUrl = config.backendApiUrl || "http://localhost:3000"
console.log(baseUrl)
class ApiServices {
    async getAllDocuments(){
        try {
           const documents = await fetch(`/api/v1/documents`)
           if(documents){
            const data = await documents.json()
            return data.data;
           } 
        } catch (error) {
            console.log("ApiServices :: getAllDocuments :: error", error);
        }
    }

    async getDocumentById(documentId){
        try {
            const document = await fetch(`/api/v1/documents/read/${documentId}`)
            if(document){
                const data = await document.json();
                return data;
            }
        } catch (error) {
            console.log("ApiServices :: getDocumentById :: error", error);
        }
    }

    async createDocument(data){
        console.log(data);
        const formData = new FormData()
        Object.keys(data).map(key=>{
            if(key === 'file'){
                formData.append(key, data[key][0])
            }else{
                formData.append(key, data[key]);
            }
        })
        const options ={
            method: 'POST', 
            body: formData
        }
        try {
           const response = await fetch(`/api/v1/documents/create`, options);
           if(response){
            const data = await response.json();
            return data;
           }
        } catch (error) {
            console.log("ApiServices :: createDocument :: error", error);
        }
    }

    async updateDocument(documentId, data){
        console.log(data);
        const formData = new FormData()
        Object.keys(data).map(key=>{
            if(key === 'file'){
                formData.append(key, data[key][0])
            }else{
                formData.append(key, data[key]);
            }
        })
        const options ={
            method: 'POST', 
            body: formData
        }
        try {
           const response = await fetch(`/api/v1/documents/update/${documentId}`, options);
           if(response){
            const data = await response.json();
            return data.data;
           }
        } catch (error) {
            console.log("ApiServices :: createDocument :: error", error);
        }
    }

    async deleteDocumentById(documentId){
        const options = {
            method: 'POST', 
        }
        try {
            const response = await fetch(`/api/v1/documents/delete/${documentId}`, options)
            if(response){
                const data = await response.json()
                return data;
            }
        } catch (error) {
            console.log("ApiServices :: deleteDocumentById :: error", error);
            throw error;
        }
    }
}



  

const apiServices = new ApiServices()

export {apiServices}