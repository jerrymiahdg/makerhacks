import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import title from './assets/Title.png'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState("nothing")
  useEffect(() => {
    fetch("http://localhost:3000/data").then((data) => data.json().then(idk => setData(idk)))
  }, [data])

  return (
    <div>
      <img src={title} width={300} />
      <header>Your Containers</header>
      <div className='tile-grid'>
        {[0,1,2,3].map(item => (<div className='tile'>
          <p>Trash Bin 1</p>
          <div class="info">
            <div class="icon">
              <div class="side"></div>
              <div id="filling"></div>
              <div class="side"></div>
            </div>
            <div id="text-info">
              <div class="bar"></div>
              <div class="text-text">
                <p id="percentage">50% full</p>
                <p>6 ft</p>
              </div>
            </div>
          </div>
        </div>))}
      </div>
    </div>
  )
}

export default App
