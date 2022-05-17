// import dotenv from 'dotenv';

export default async (req, res) => {
	const { method } = req;
	const SERVER = process.env.AI_STUDIOS_PROXY;


	switch (method) {
		case "GET":
			try {
				const clientResponse = await fetch(`${SERVER}/generateClientToken?appId=${process.env.AI_STUDIOS_APPID}&userKey=${process.env.AI_STUDIOS_UUID}`, {
                    method: "GET"
                });
				const clientData = await clientResponse.json()
				const tokenResponse = await fetch(`${SERVER}/generateToken`,{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"appId": process.env.AI_STUDIOS_APPID,
						"platform":process.env.AI_STUDIOS_PLATFORM,
						"isClientToken":true,
						"token": clientData.token,
						"uuid":process.env.AI_STUDIOS_UUID,
						"sdk_v":process.env.AI_STUDIOS_SDK_V,
						"clientHostname":process.env.AI_STUDIOS_CLIENTHOSTNAME
					}),
				})
				const authToken = await tokenResponse.json()
                return res.status(200).json(authToken)
                
				// return res.json({
				// 	success: true,
				// 	data: authToken,
				// });
			} catch (error) {
				return res.status(400).json({
					success: false,
					error: error
				});
			}
		case "POST":
			try {

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