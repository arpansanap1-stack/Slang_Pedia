import "./globals.css";

export const metadata = {
	title: "SlangPedia",
	description: "The Internet Chat Decoder",
	metadataBase: new URL("http://localhost:3000")
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
