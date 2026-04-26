import { config } from "../config/config.js";
const baseUrl = config.backendApiUrl || "http://localhost:3000"

class AuthServices{
    
    async login({username, password}){
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }

        try {
            const session = await fetch(`${baseUrl}/api/v1/users/login`, options);
            if(!session.ok){
                const errorData = await session.json()
                throw new Error(errorData.message)
            }else{
                const activeSession = await session.json()
                return activeSession;
            }  
        } catch (error) {
            console.log("AuthServices :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser(){
                try {
                    const loggedInUser = await fetch(`${baseUrl}/api/v1/users`)
                    if(!loggedInUser) return null
                    const data = await loggedInUser.json()
                    return data
                } catch (error) {
                    console.log("ApiServices :: getCurrentUser :: error", error)
                }
            }

}

const authServices = new AuthServices()

export {authServices};