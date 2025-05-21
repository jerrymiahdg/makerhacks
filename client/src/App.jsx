import { useState, useEffect } from "react";
import "./App.css";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  const [count, setCount] = useState(0);
  const [data, setData] = useState(0);
  const [newData, setNewData] = useState([
    // {
    //   ID: 12345,
    //   Name: "Set Name",
    //   "Fill level": 30,
    //   Latitude: 38,
    //   Longitude: -122,
    //   Height: 40,
    //   Percent: 100 - Math.round((Number(30) / 40) * 100),
    //   Editing: false,
    // },
    // {
    //   ID: 54321,
    //   Name: "Set Name",
    //   "Fill level": 40,
    //   Latitude: 40,
    //   Longitude: -120,
    //   Height: 50,
    //   Percent: 100 - Math.round((Number(40) / 50) * 100),
    //   Editing: false,
    // },
  ]);
  const [containerEditing, setContainerEditing] = useState(false);
  const [iH, setIH] = useState(0);
  const [iName, setIName] = useState("");
  const [containers, setContainers] = useState([]);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    console.log(width);
    setInterval(() => {
      fetch(
        // "https://script.google.com/macros/s/AKfycbysKrl6-8NcMOPytZgh-_dWFGPjl-GKabV2N98HzYGCZWJMy4oD3Mx7sDm1qT8ju--QWg/exec"
        // "https://script.google.com/macros/s/AKfycbysKrl6-8NcMOPytZgh-_dWFGPjl-GKabV2N98HzYGCZWJMy4oD3Mx7sDm1qT8ju--QWg/exec"
        "https://script.googleusercontent.com/a/macros/student.musd.org/echo?user_content_key=AehSKLhdCxJ0UrYVL9R9XZVmtmGcdl_NTuKnd-_9CGoHv2kqmY6gsYB4bBbIl0buGm4X0yXDkCLuGW2Vrc7Hg6XrOSqbMIrlrtupBs75uIHAV-er0QuaejXJhg2cUocYbaCIDlytWiypf5LPCeGMQ9LrtLg6fwAbmb58m33m24eTVABnmTfq83fD6CHa2irBXs8KLEffxj4l6lt9tkGThtBuF1Eq35meUK3Vs-3FVZ7X1XJCq6S83uAvsyjr9bRwAV8yStUWq_e3A4P73icLoX46IirsmXTSasERiITg_4mhH4XHemduPFm1mMuL6zjpcg&lib=Ma4aRQfq5bpnXaHMG9WBodxfcK2AJdYLn"
      ).then((data) =>
        data.json().then((data) => {
          console.log(data);

          setNewData((prev) => {
            const copy = [...prev];
            for (const item of data) {
              let i = 0;
              while (i < copy.length && copy[i].ID != item.ID) i++;
              if (i < copy.length) {
                copy[i]["Fill level"] = Number(item["Fill level"]);
                copy[i].Longitude = item.Longitude;
                copy[i].Latitude = item.Latitude;
                copy[i].Percent = getPercent(
                  item["Fill level"],
                  copy[i].Height
                );
              } else {
                copy.push({
                  ID: item.ID,
                  Name: "Set Name",
                  "Fill level": Number(item["Fill level"]),
                  Latitude: item.Latitude,
                  Longitude: item.Longitude,
                  Height: Number(item["Fill level"]),
                  Percent: 0,
                });
              }
            }
            return copy;
          });
        })
      );
    }, 1000);
  }, [data]);

  const getPercent = (data, height) => {
    let percent = 100 - Math.round((Number(data) / height) * 100);
    if (percent < 0) percent = 0;
    return percent;
  };

  const calBtnFactory = (ID) => () => {
    setNewData((containers) => {
      const copy = [...containers];
      let i = 0;
      while (copy[i].ID !== ID) i++;
      copy[i].Height = copy[i]["Fill level"];
      copy[i].Percent = 0;
      return copy;
    });
  };

  return (
    <div className="font-winky-sans">
      {/* <input onChange={(e) => changeFullness(e.target.value)} /> */}
      {/* <img src={title} width={300} /> */}
      <div className="w-full p-5 border-b border-neutral-300 flex justify-between items-center">
        <p className="text-3xl font-bold">Trash Management</p>
      </div>
      <div className="flex justify-between gap-2 flex-col md:flex-row">
        <div className="flex flex-col md:w-[50%] border-r-0 md:border-r border-neutral-200">
          <header>Containers</header>

          <div className="tile-grid">
            {newData.map((item) => (
              <div key={item.ID}>
                <div className="tile">
                  <div className="flex justify-between items-center">
                    <div>
                      {containerEditing == item.ID ? (
                        <div>
                          <div className="midinput flex gap-5 items-center border-neutral-300">
                            <label className="iCChild">Name</label>
                            <input
                              className="iCChild edit-name"
                              value={iName}
                              onChange={(e) => setIName(e.target.value)}
                            />
                          </div>
                          <div className="midinput flex gap-5 items-center border-neutral-300">
                            <label className="iCChild">Height (cm)</label>
                            <input
                              className="iCChild edit-name"
                              value={iH}
                              onChange={(e) => setIH(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="banana">{item.Name}</p>
                      )}
                      Location: {item.Latitude}, {item.Longitude}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          if (containerEditing == item.ID) {
                            setNewData((containers) => {
                              const copy = [...containers];
                              let i = 0;
                              while (copy[i].ID !== item.ID) i++;
                              copy[i].Height = Number(iH);
                              copy[i].Name = iName;
                              copy[i].Percent = getPercent(
                                copy[i]["Fill level"],
                                Number(iH)
                              );
                              return copy;
                            });
                            setContainerEditing(false);
                          } else {
                            setContainerEditing(item.ID);
                            setIH(item.Height);
                            setIName(item.Name);
                          }
                        }}
                        type="button"
                        className="banana edit-btn"
                      >
                        {containerEditing == item.ID
                          ? "Done"
                          : "Edit Container"}
                      </button>
                      {containerEditing == item.ID && (
                        <button
                          type="button"
                          className="banana edit-btn"
                          onClick={() => {
                            setIH(item.Height);
                            setIName(item.Name);
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                  <div class="info">
                    <div class="icon">
                      <div class="side"></div>
                      <div
                        style={{ height: `${item.Percent}%` }}
                        id="filling"
                      ></div>
                      <div class="side"></div>
                    </div>
                    <div
                      id="text-info"
                      style={{
                        height: `${item.Percent > 0 ? item.Percent : 100}%`,
                      }}
                    >
                      <div
                        class="bar"
                        style={{ opacity: item.Percent > 0 ? "100" : "0" }}
                      ></div>
                      <div class="text-text">
                        <div id="percentage">{item.Percent}% full</div>
                        <div>
                          {item.Height - Math.round(item["Fill level"]) > 0
                            ? item.Height - Math.round(item["Fill level"])
                            : 0}{" "}
                          cm of {item.Height} cm
                        </div>
                        <button type="button" onClick={calBtnFactory(item.ID)}>
                          Calibrate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <header>Map</header>
          <APIProvider apiKey={import.meta.env.VITE_APIKEY}>
            <Map
              style={{
                width:
                  width < 768
                    ? "calc(100vw - 80px)"
                    : width >= 1280
                    ? "560px"
                    : "calc(50vw - 88px)",
                height: "50vh",
              }}
              defaultCenter={
                newData.length > 0
                  ? { lat: newData[0].Latitude, lng: newData[0].Longitude }
                  : { lat: 37.451682, lng: -121.901221 }
              }
              defaultZoom={15}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              {newData.map((item) => (
                <Marker
                  label={`${item.Name} | ${item.Percent}% Full`}
                  position={{ lat: item.Latitude, lng: item.Longitude }}
                ></Marker>
              ))}
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
