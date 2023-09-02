import { useState, useCallback, useEffect, useRef } from 'react';
import './btn.css'

function App() {
	const [length, setLength] = useState(8);
	const [numAllowed, setNumAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState('');
	const [btnText, setBtnText] = useState('copy?');

	//useRef Hook

	const passwordRef = useRef(null);

	const passwordGenerator = useCallback(() => {
		let pass = '';
		let str = 'ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxyz';
		if (numAllowed) str += '0123456789';
		if (charAllowed) str += '!@#$%^&*()_-+={}[]~`';
		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}
		setPassword(pass);
	}, [length, numAllowed, charAllowed, setPassword]);

	const copyToClipBoard = useCallback(() => {
		passwordRef.current?.select();
		passwordRef.current?.setSelectionRange(0, 999);
		window.navigator.clipboard.writeText(password);
		setBtnText('copied!')
		setTimeout(() => {
			setBtnText('copy?');
		  }, 1500);
	}, [password]);

	useEffect(() => {
		passwordGenerator();
	}, [length, numAllowed, charAllowed, passwordGenerator]);

	return (
		<>
			<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
				<h1 className="text-xl text-center text-white">Smooth Password Generator</h1>
				<div className="flex shadow rounded-lg overflow-hidden mb-4">
					<input
						type="text"
						className="outline-none w-full py-1 px-3"
						placeholder="Password"
						value={password}
						readOnly
						ref={passwordRef}
					/>
					<button
					id='copy-btn'
						className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
						onClick={copyToClipBoard}
					>
						{btnText}
					</button>
				</div>
				<div className="flex text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={6}
							max={100}
							value={length}
							className="cursor-pointer"
							onChange={(evt) => {
								setLength(evt.target.value);
							}}
						/>
						<label>Length: {length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							id="numInput"
							defaultChecked={numAllowed}
							onChange={() => {
								setNumAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="numInput">Numbers</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							id="charInput"
							defaultChecked={charAllowed}
							onChange={() => {
								setCharAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor="charInput">Chars</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
