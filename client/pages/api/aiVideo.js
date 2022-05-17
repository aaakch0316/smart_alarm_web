import axios from 'axios';
// import dotenv from 'dotenv';

const SERVER = process.env.AI_STUDIOS_PROXY;
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

				let token = req.body.token
                const keyResponse = await axios.post(`${SERVER}/makeVideo`, 
					{
						appId:"aistudios.com",
						platform:"web",
						isClientToken:true,
						token: token,
						uuid:"6443234b-77d5-4013-bfd6-bb9399f317d9",
						sdk_v:"1.0",
						clientHostname:"aistudios.com",
						language: req.body.language,
						text: req.body.text,
						model: req.body.model,
						clothes: "1"
					},
					{headers}
				)

				const videoKey = keyResponse.data.data.key
				
				
				let videoBaseUrl = 'https://user-images.githubusercontent.com/60080224/168462583-71a048fa-4447-422e-bf57-763b0766db0f.mp4'
				
				let flag ="waiting"
				while (true){
					if (flag ==="waiting" || flag !== 100){
						const videoResponse = await fetch(`${SERVER}/findProject`,{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								"appId":"aistudios.com",
								"platform":"web",
								"isClientToken":true,
								"token":token,
								"uuid":"6443234b-77d5-4013-bfd6-bb9399f317d9",
								"sdk_v":"1.0",
								"clientHostname":"aistudios.com",
								"key": videoKey
							}),
						})
						const videoUrl = await videoResponse.json()
						flag = videoUrl.data.progress
						console.log(flag)
					}else{
						const videoResponse = await fetch(`${SERVER}/findProject`,{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								"appId":"aistudios.com",
								"platform":"web",
								"isClientToken":true,
								"token":token,
								"uuid":"6443234b-77d5-4013-bfd6-bb9399f317d9",
								"sdk_v":"1.0",
								"clientHostname":"aistudios.com",
								"key": videoKey
							}),
						})
						console.log(3)
						const videoUrl = await videoResponse.json()
						console.log(videoUrl)
						console.log('endendend')
						return res.status(201).json({mp4Url : videoUrl.data.video});
					}
				}

				console.log(videoBaseUrl)

				return res.status(201).json({mp4Url : videoBaseUrl});

                // return res.status(200).json(keyResponse.data)
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