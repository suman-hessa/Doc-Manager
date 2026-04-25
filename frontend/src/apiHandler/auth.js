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
            const session = await fetch("/api/v1/users/login", options);
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
                    const loggedInUser = await fetch("/api/v1/users")
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