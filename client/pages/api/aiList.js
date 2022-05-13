import axios from 'axios';

const SERVER = 'https://dev.aistudios.com/api/odin'
const headers = {
    "content-Type": "application/json",
    // Authorization: "JWT fetching..."
}


export default async (req, res) => {
	const { method } = req;
    console.log('???')

	switch (method) {
		case "GET":
			try {

			} catch (error) {
				console.log(error)
				return res.status(400).json({
					success: false,
					error: error
				});
			}
		case "POST":
			try {
                // console.log(req.body)
                // console.log(req.body.token)
                console.log('modelLIstApi')
                const response = await axios.post(`${SERVER}/getModelList`, 
                {
                    appId:"aistudios.com",
                    platform:"web",
                    isClientToken:true,
                    token: req.body.token,
                    uuid:"6443234b-77d5-4013-bfd6-bb9399f317d9",
                    sdk_v:"1.0",
                    clientHostname:"aistudios.com"
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