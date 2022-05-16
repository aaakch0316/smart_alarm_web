
export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
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