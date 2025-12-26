import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

export default function PasswordGenerator() {
	const [length, setLength] = useState(16);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [characterAllowed, setCharacterAllowed] = useState(false);
	const [password, setPassword] = useState("");

	const passwordGenerator = useCallback(() => {
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		let pass = "";

		if (numberAllowed) str += "0123456789";
		if (characterAllowed) str += "!@#$%^&*()_+-=[]{}|;:,.<>?";

		for (let i = 0; i < length; i++) {
			let charIdx = Math.floor(Math.random() * str.length);

			pass += str.charAt(charIdx);
		}

		setPassword(pass);
	}, [length, numberAllowed, characterAllowed, setPassword]);

	useEffect(() => {
		passwordGenerator();
	}, [passwordGenerator]);

	return (
		<div className="flex justify-center items-center">
			<div className="p-8 my-10 bg-slate-300 flex flex-col items-center rounded-xl shadow-lg">
				<h1 className="font-medium text-center text-xl">
					Password Generator
				</h1>
				<div>
					<input
						type="text"
						name="password"
						id=""
						placeholder="password"
						className="p-2 m-3 rounded-xl w-xs outline-1 bg-amber-50"
						value={password}
						readOnly
					/>
					<button className="p-2 bg-blue-400 rounded-xl outline-0 w-20 font-medium">
						Copy
					</button>
				</div>
				<div className="flex gap-3 text-sm font-medium ">
					<label htmlFor="" className="flex items-center gap-2">
						<input
							type="range"
							className="w-35 cursor-pointer accent-indigo-500 "
							min="8"
							max="32"
							onChange={(e) => Number(setLength(e.target.value))}
							value={length}
						/>{" "}
						Length ({length})
					</label>
					<label htmlFor="" className="flex items-center gap-2 ">
						<input
							type="checkbox"
							id="num"
							className="w-4 h-4 accent-indigo-500 cursor-pointer"
							onChange={(e) => setNumberAllowed(e.target.checked)}
							checked={numberAllowed}
						/>{" "}
						Numbers
					</label>
					<label htmlFor="" className="flex items-center gap-2 ">
						<input
							type="checkbox"
							id="characters"
							className="w-4 h-4 accent-indigo-500 cursor-pointer"
							onChange={(e) =>
								setCharacterAllowed(e.target.checked)
							}
							checked={characterAllowed}
						/>
						Characters
					</label>
				</div>
			</div>
		</div>
	);
}
