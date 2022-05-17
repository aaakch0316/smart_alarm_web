// import dotenv from 'dotenv';
import axios from 'axios';

const SERVER = process.env.AI_STUDIOS_PROXY
const headers = {
    "content-Type": "application/json",
    // Authorization: "JWT fetching..."
}


export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {

			} catch (error) {
				return res.status(400).json({
					success: false,
					error: error
				});
			}
		case "POST":
			try {
                const response = await axios.post(`${SERVER}/getModelList`, 
                {
                    appId:process.env.AI_STUDIOS_APPID,
                    platform:process.env.AI_STUDIOS_PLATFORM,
                    isClientToken:true,
                    token: req.body.token,
                    uuid:process.env.AI_STUDIOS_UUID,
                    sdk_v:process.env.AI_STUDIOS_SDK_V,
                    clientHostname:process.env.AI_STUDIOS_CLIENTHOSTNAME
                }, 
                {headers})

                return res.status(200).json(response.data)
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		default:
			res.setHeaders("Allow", ["GET", "POST"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};