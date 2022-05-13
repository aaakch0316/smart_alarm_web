
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