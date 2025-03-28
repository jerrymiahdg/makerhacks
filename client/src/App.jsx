import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import title from './assets/Title.png'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(0)
  const [newData, setNewData] = useState([
    {"ID":2352, "Fill sensor 1":12, "Fill sensor 2":23423, "Lat":124.114, "Lng":53.51, "":2},    {"ID":2352, "Fill sensor 1":12, "Fill sensor 2":23423, "Lat":124.114, "Lng":53.51, "":2}
  ])
  const [iH, setIH] = useState(0)
  const [iName, setIName] = useState("");
  const [height, setHeight] = useState(false)
  const [containers, setContainers] = useState([])
  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:3000/data").then((data) => data.json().then(idk => changeFullness(idk)))
    }, 1000)

    fetch("https://script.googleusercontent.com/a/macros/student.musd.org/echo?user_content_key=AehSKLiqxKO_SRRPWRs2qHHY4xfSm-oGAQD8rg6UInx-Y92n4qc-avxCvZzFvh6-uowFrMM6BWITVis8EICUKWj3ahtWEpduBqvGwSqtXLhFSDp92k3Z8id_AgH24vQvGxYtM1kQZ9-_QruJ0uUcHoKwU3poFoSMis-YfraqSuZufkI38svdODyZ801HbnOovbgWQGwKj9Pw4mbIuDcDtbWbNyA_M6b3AV2pYcCtLrVky1_fHOxg-wGcb_WDNqvH4kWUDeBr7ZqbsC-iHuGlUdchEUlvnBbHxCehPmdlJ_9BbFQtd6aGCHr1i-SZiK7hFA&lib=MHx8C4qkf0f6Jg99vxj_yuhI1Gs6Nkp1M").then((data) => data.json().then(data => setNewData(data)))

  }, [data])

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
    <div className='font-winky-sans'>
      {/* <input onChange={(e) => changeFullness(e.target.value)} /> */}
      {/* <img src={title} width={300} /> */}
      <div className='w-full p-5 border-b border-neutral-300 flex justify-between items-center'>
              <p className='text-3xl font-bold'>Trash Management</p>
              <p className='text-2xl '>Containers</p>
      </div>
      <header>Add Container</header>
      <div className='inputContainer flex flex-col items-center'>
        <div className='midinput flex gap-5 items-center border-neutral-300'>
          <label className='iCChild'>Name</label>
          <input className='iCChild border' value={iName} onChange={(e) => setIName(e.target.value)} />
        </div>
        <div className='midinput flex gap-5 items-center border-neutral-300'>
          <label className='iCChild'>Height (cm)</label>
          <input className='iCChild border' value={iH} onChange={(e) => setIH(e.target.value)} />
        </div>
        <button className='iCChild w-full cursor-pointer' type='button' onClick={() => setIH(Math.floor(data))}>Calibrate</button>
        <button className='iCChild w-full cursor-pointer' type='button' onClick={addContainer}>Add Container</button>
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
