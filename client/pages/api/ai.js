import axios from 'axios';

const SERVER = 'https://dev.aistudios.com/api/odin'
const headers = {
    "content-Type": "application/json",
    // Authorization: "JWT fetching..."
}

export const modelListApi = async () => {
    try{
        const clientResponse = await fetch("https://dev.aistudios.com/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9", {
            method: "GET"
        });
        const clientData = await clientResponse.json()
        const tokenResponse = await fetch("https://dev.aistudios.com/api/odin/generateToken",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "appId":"aistudios.com",
                "platform":"web",
                "isClientToken":true,
                "token": clientData.token,
                "uuid":"6443234b-77d5-4013-bfd6-bb9399f317d9",
                "sdk_v":"1.0",
                "clientHostname":"aistudios.com"
            }),
        })
        const authToken = await tokenResponse.json()

        return authToken
        // console.log('modelLIstApi')
        // const response = await axios.post(`${SERVER}/getModelList`, 
        // {
        //     appId:"aistudios.com",
        //     platform:"web",
        //     isClientToken:true,
        //     token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImFpc3R1ZGlvcy5jb20iLCJwbGF0Zm9ybSI6IndlYiIsImlhdCI6MTY1MjI2NzU2OSwiZXhwIjoxNjUyMzUzOTY5fQ.sblbLQBCOzNtSe2Bq0Wgaik02RYSM2NaWwxLU5nenfU",
        //     uuid:"6443234b-77d5-4013-bfd6-bb9399f317d9",
        //     sdk_v:"1.0",
        //     clientHostname:"aistudios.com"
        // }, 
        // {headers})
        // console.log(response.data)

        // return response.data
    }catch(error){
        return error
    }
}
