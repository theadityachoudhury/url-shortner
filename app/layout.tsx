import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Shortly",
	description:
		"Shortly: Your go-to destination for effortlessly shortening long URLs into sleek, manageable links. Streamline your sharing experience, save characters, and enhance accessibility with Shortly's intuitive link shortening service. Simplify your online presence today!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${poppins.variable} bg-slate-200 flex space-y-4 flex-col justify-center items-center h-screen`}>
				{children}
			</body>
		</html>
	);
}
