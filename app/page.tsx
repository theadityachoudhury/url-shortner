"use client";

import { useState } from "react";
import isLink from "@/Validators";
import axios from "axios";

export default function Home() {
	const [link, setLink] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [shortLink, setShortLink] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLink(e.target.value);
		if (e.target.value == "" && error != "") setError("");
		else {
			if (isLink(e.target.value)) setError("");
			else setError("Please enter a valid URL with http:// or https://");
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			let config = {
				method: "post",
				url: "/api/shorten",
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					url: link,
				},
			};
			const { data } = await axios.request(config);
			setShortLink(`${process.env.NEXT_PUBLIC_HOST_URL}/${data.slug}`);
		} catch (error) {
			setError("Internal Server Error");
		}
		
	};

	return (
		<div className="space-y-4">
			<h1 className="md:text-9xl text-8xl font-extralight animate-pulse">
				Short.Ly
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
				<input
					onChange={handleChange}
					value={link}
					type="text"
					placeholder="Paste the link here"
					autoFocus
					className="border border-black placeholder:text-gray-700 text-black rounded-xl p-3 w-full sm:w-96"
				/>
				<button
					type="submit"
					disabled={error != "" || link == ""}
					className="bg-indigo-500 hover:bg-indigo-600 rounded-md px-4 py-2 text-black">
					Generate
				</button>
			</form>
			<div id="error" className="">
				<p className="relative text-red-500">‎ {error}</p>
			</div>
			<div id="short-link" className="">
				{shortLink && (
					<p className="text-black text-2xl">
						Your Shortened URL is: <a href={shortLink} target="_blank">{shortLink}</a>
					</p>
				)}
			</div>
		</div>
	);
}
