import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook
  const passwordRef=useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);
  const copyPassWordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99999)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    
      <div className="w-full max-w-xl bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl px-6 py-6">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Password generator
        </h1>

        {/* Password Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl text-lg text-gray-800 outline-none"
            ref={passwordRef}
            />
            <button
            onClick={copyPassWordToClipboard}
             className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                className="cursor-pointer"
                onChange={(e)=>
                {setLength(e.target.value)}
                }
                />
                <label>Lenght:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={()=>{
                    setNumberAllowed((prev)=>
                    !prev);
                }}
                />
                <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}    
                id="charInput"
                onChange={()=>{
                    setCharAllowed((prev)=>
                    !prev);
                }}
                />
                <label htmlFor="charInput">Characters</label>   
              </div>

          </div>
      </div>
    

  );
}

export default App;
