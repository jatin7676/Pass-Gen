import { useState, useCallback, useEffect, useRef } from 'react'





function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);


  const [password, setPassword] = useState("");
  //REF HOOK
  const pasref = useRef(null);


  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow == true) {
      str += "0123456789";
    }
    if (charAllow == true) {
      str += "{}!@#*()&^%$~-";
    }
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword])
  const copyClip = useCallback(() => {
    pasref.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => { passGen() }, [length, numAllow, charAllow, setPassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className=' text-white text-center my-3'>Password-Genrator</h1>

        <div className=' flex shadow rounded-lg overflow-hidden mb-4 '>
          <input
            type="text"
            value={password}
            className='outline-none  w-full py-1 px-3 '
            placeholder='password'
            ref={pasref}
          />
          <button
            onClick={copyClip} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              checked={numAllow}
              onChange={() => setNumAllow(prev => !prev)}
              id="number"
            />
            <label htmlFor="number">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              checked={charAllow}
              onChange={() => setCharAllow(prev => !prev)}
              id="charInput"
            />
            <label htmlFor="charInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
