import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import title from './assets/Title.png'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(0)
  const [iH, setIH] = useState(0)
  const [iName, setIName] = useState("");
  const [height, setHeight] = useState(false)
  const [containers, setContainers] = useState([])
  // useEffect(() => {
  //   setInterval(() => {
  //     fetch("http://localhost:3000/data").then((data) => data.json().then(idk => changeFullness(idk)))
  //   }, 1000)

  // }, [data])

  // useEffect(() => {
  //   console.log("banana")
  //   if (!init.current) {
  //     init.current = true;
  //     return;
  //   }
  //   setContainers((containers) => {
  //     console.log(containers)
  //     if (containers) containers.unshift({data: 0, height: height})
  //     return containers;
  //   })
  // }, [height])

  let percent = 100 - Math.round(Number(data) / height * 100)
  if (percent < 0) percent = 0;

  const getPercent = (data, height) => {
    let percent = 100 - Math.round(Number(data) / height * 100)
    if (percent < 0) percent = 0;
    return percent;
  }

  const changeFullness = (value) => {
    setData(value)
    setContainers((containers) => {
      if (containers.length == 0) return [];
      const copy = [...containers]
      copy[0].data = value;
      copy[0].percent = getPercent(value, copy[0].height)
      return copy;
    })
  }

  const addContainer = () => {
    if (iH <= 0 || !iName) return;
    setContainers((containers) => {
      const copy = [...containers]
      console.log(containers)
      if (copy) copy.unshift({ data: 0, height: iH, name: iName, key: Math.random() * 10000 })
      console.log("updating")
      console.log(containers)
      setHeight(!height)
      return copy;
    })
    setIH(0)
    setIName("")
  }

  return (
    <div>
      <input onChange={(e) => changeFullness(e.target.value)} />
      <img src={title} width={300} />

      <header>Your Containers</header>
      <div className='inputContainer'>
        <div className='midinput'>
          <label className='iCChild'>Name</label>
          <input className='iCChild' value={iName} onChange={(e) => setIName(e.target.value)} />
        </div>
        <div className='midinput'>
          <label className='iCChild'>Height (cm)</label>
          <input className='iCChild' value={iH} onChange={(e) => setIH(e.target.value)} />
        </div>
        <button className='iCChild' type='button' onClick={() => setIH(data)}>Calibrate</button>
        <button className='iCChild' type='button' onClick={addContainer}>Add Container</button>
      </div>
      {/* {containers.map(item => (<div>
        <p>{item.data}</p>
        <p>{item.height}</p>
      </div>))} */}
      <div className='tile-grid'>
        {containers.map(item => (<div key={item.key}>
          {/* <div className='tile-out'> */}
          <div className='tile'>
            <p className='banana'>{item.name}</p>
            <div class="info">
              <div class="icon">
                <div class="side"></div>
                <div style={{ height: `${item.percent}%` }} id="filling"></div>
                <div class="side"></div>
              </div>
              <div id="text-info" style={{ height: `${item.percent > 0 ? item.percent : 100}%` }}>
                <div class="bar" style={{ opacity: item.percent > 0 ? '100' : '0' }}></div>
                <div class="text-text">
                  <div id="percentage">{item.percent}% full</div>
                  <div>{(item.height - Math.round(item.data)) > 0 ? item.height - Math.round(item.data) : 0} cm of {item.height} cm</div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>))}
      </div>
    </div>
  )
}

export default App
