import { config } from "../config/config.js";
const baseUrl = config.backendApiUrl || "http://localhost:3000"

class AuthServices{
    
    async login({username, password}){
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
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
                console.log({activeSession})
                return activeSession;
            }  
        } catch (error) {
            console.log("AuthServices :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser(){
                const options = {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                try {
                    const loggedInUser = await fetch(`${baseUrl}/api/v1/users`, options)
                    if(!loggedInUser) return null
                    const data = await loggedInUser.json()
                    console.log({data})
                    return data
                } catch (error) {
                    console.log("ApiServices :: getCurrentUser :: error", error)
                }
            }

}

const authServices = new AuthServices()

export {authServices};