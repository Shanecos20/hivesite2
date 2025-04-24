import { useState } from 'react'
import reactLogo from './assets/react.svg'
import hiveLogo from '/assets/logov3.png'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={hiveLogo} className="logo" alt="Hive logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={hiveLogo} className="logo react" alt="Hive logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
