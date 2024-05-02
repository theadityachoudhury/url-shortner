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
        setShortLink("https://shortly.adityachoudhury.com/8gw28h");
        //sleep for 2 seconds

        setLoading(false); // Stop loading
        // try {
        //     let config = {
        //         method: "post",
        //         url: "/api/shorten",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         data: {
        //             url: link,
        //         },
        //     };
        //     const { data } = await axios.request(config);
        //     setShortLink(`${process.env.NEXT_PUBLIC_HOST_URL}/${data.slug}`);
        // } catch (error) {
        //     setError("Internal Server Error");
        // } finally {
        //     setLoading(false); // Stop loading
        // }
    };

    useEffect(() => {
        if (error && shortLink) setShortLink(""); // Reset shortLink if error occurs
    }, [error, shortLink]);

    // return (
    //     <div className="space-y-4 mx-2 sm:mx-2 p-2">
    //         <h1 className="md:text-9xl text-8xl font-extralight animate-pulse">
    //             Short.Ly
    //         </h1>
    //         <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
    //             <input
    //                 onChange={handleChange}
    //                 value={link}
    //                 type="text"
    //                 placeholder="Paste the link here"
    //                 autoFocus
    //                 className="border border-black placeholder:text-gray-700 text-black rounded-xl p-3 w-full sm:w-96"
    //             />
    //             <button
    //                 type="submit"
    //                 disabled={error !== "" || link === "" || loading} // Disable button while loading
    //                 className="bg-indigo-500 hover:bg-indigo-600 rounded-md px-4 py-2 text-black">
    //                 Generate
    //             </button>
    //         </form>
    //         <div id="error" className="">
    //             <p className="relative text-red-500">‎ {error}</p>
    //         </div>
    //         <div id="short-link" className="">
    //             {loading ? (
    //                 <p className="text-black text-2xl">Loading...</p>
    //             ) : (
    //                 shortLink && (
    //                     <div className="space-x-2 text-xl">
    // 							<a href={shortLink} target="_blank" className="bg-slate-300 p-2 rounded-md">{shortLink}</a>
    // 							<button onClick={() => {
    // 								navigator.clipboard.writeText(shortLink);
    // 								setCopied(true);
    // 								setTimeout(() => setCopied(false), 10000);
    // 							}} className="text-xl bg-black text-white p-1 rounded-md hover:bg-slate-800" >{copied?"Copied":"Copy"}</button>
    //                     </div>
    //                 )
    //             )}
    //         </div>
    //     </div>
    // );

    return (
        <div className="flex justify-center h-screen items-center">
            <div className="space-y-5">
                <div id="branding" className="text-center m-2">
                    <h1>Short.ly</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5 mx-2">
                    <div id="input" className="w-full">
                        <input id="linkInput" name="linkInput" type="text" placeholder="Paste the link here" onChange={handleChange} value={link} autoFocus />
                    </div>

                    <div id="submitButton">
                        <button disabled={error !== "" || link === "" || loading}>Shorten</button>
                    </div>
                </form>

                <div id="errorMessage" className="m-2">
                    <div id="">
                        <p className="mt-2">{error ? `Error : ${error}` : ""}</p>
                    </div>
                </div>

                <div className="max-w-screen-sm mx-2">
                    {loading ? (
                        <p className="">Loading...</p>
                    ) : (
                        shortLink && (
                            <div className="grid">
                                <div className="flex items-center rounded-t-md bg-black text-white px-3 py-1">
                                    <p className="flex-grow text-left">Short Link</p>

                                    <button onClick={() => {
                                        navigator.clipboard.writeText(shortLink);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 10000);
                                    }} className="">
                                        {copied ? "Copied" : "Copy"}
                                    </button>
                                </div>
                                <a href={shortLink} target="_blank" className="text-xl bg-slate-500 p-2 rounded-b-md overflow-x-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-full sm:scrollbar-none">{shortLink}</a>
                            </div>
                        )
                    )}
                </div>
            </div>

        </div >
    )
}
