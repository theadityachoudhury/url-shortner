// Import useState and useEffect hooks from React
"use client";
import isLink from "@/Validators";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
    const [link, setLink] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [shortLink, setShortLink] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false); // Add loading state
	const [copied, setCopied] = useState<boolean>(false); // Add copied state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
        if (e.target.value === "" && error !== "") setError("");
        else {
            if (isLink(e.target.value)) setError("");
            else setError("Please enter a valid URL with http:// or https://");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Start loading
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
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (error && shortLink) setShortLink(""); // Reset shortLink if error occurs
    }, [error, shortLink]);

    return (
        <div className="space-y-4 mx-2 sm:mx-2 p-2">
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
                    disabled={error !== "" || link === "" || loading} // Disable button while loading
                    className="bg-indigo-500 hover:bg-indigo-600 rounded-md px-4 py-2 text-black">
                    Generate
                </button>
            </form>
            <div id="error" className="">
                <p className="relative text-red-500">‎ {error}</p>
            </div>
            <div id="short-link" className="">
                {loading ? (
                    <p className="text-black text-2xl">Loading...</p>
                ) : (
                    shortLink && (
                        <div className="space-x-2 text-xl">
								<a href={shortLink} target="_blank" className="bg-slate-300 p-2 rounded-md">{shortLink}</a>
								<button onClick={() => {
									navigator.clipboard.writeText(shortLink);
									setCopied(true);
									setTimeout(() => setCopied(false), 10000);
								}} className="text-xl bg-black text-white p-1 rounded-md hover:bg-slate-800" >{copied?"Copied":"Copy"}</button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
