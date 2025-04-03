import { useState, useEffect } from "react";
import HomeSlide from "../components/HomeSlide";
import classes from "./Home.module.css";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await fetch("http://localhost:9000");
  const reqdata = await response.json();
  return reqdata;
}

function Directions({ from, to, mode }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const coreLibrary = useMapsLibrary("core");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        draggable: true, // Only necessary for draggable markers
        map,
      })
    );
  }, [routesLibrary, map]);

  // Add the following useEffect to make markers draggable
  useEffect(() => {
    if (!directionsRenderer) return;

    // Add the listener to update routes when directions change
    const listener = directionsRenderer.addListener(
      "directions_changed",
      () => {
        const result = directionsRenderer.getDirections();
        if (result) {
          setRoutes(result.routes);
        }
      }
    );

    return () => coreLibrary.event.removeListener(listener);
  }, [directionsRenderer]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsRenderer.setDirections(null);
    directionsService
      .route({
        origin: from,
        destination: to,
        travelMode: mode,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;
}

function Home() {
  const touristSpot = useLoaderData()?.touristSpotList || [];
  const festivalList = useLoaderData()?.festivalList || [];
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mode, setMode] = useState("TRANSIT");
  const [showDirections, setShowDirections] = useState(false);

  function setFromHandler(event) {
    setFrom(event.target.value);
  }
  function setToHandler(event) {
    setTo(event.target.value);
  }
  function setModeHandler(event) {
    console.log(event.target.value);
    setMode(event.target.value);
  }
  function handleFindRoute() {
    setShowDirections(false);
    setTimeout(() => setShowDirections(true), 100);
  }

  return (
    <>
      <video preload="auto" muted autoPlay loop>
        <source
          src="https://www.busan.go.kr/humanframe/theme/busan22/assets/video/main_v2.mp4"
          type="video/mp4"
        />
      </video>

      <div className={classes.mainContainer}>
        <div className={classes.panelContainer}>
          <div className={classes.panel}>
            <h1>길찾기</h1>
            <div>
              <label htmlFor="start"> 출발지: </label>
              <input
                type="text"
                value={from}
                placeholder="Enter location"
                onChange={setFromHandler}
              />
            </div>
            <div>
              <label htmlFor="end"> 도착지: </label>
              <input
                type="text"
                value={to}
                placeholder="Enter location"
                onChange={setToHandler}
              />
            </div>
            <div>
              <strong>여행모드: </strong>
              <select onChange={setModeHandler}>
                <option value="TRANSIT">대중교통</option>
                <option value="DRIVING">자동차</option>
                <option value="WALKING">도보</option>
                <option value="BICYCLING">자전거</option>
              </select>
              <input value="길찾기" type="button" onClick={handleFindRoute} />
              <div id="popup"></div>
            </div>
          </div>
          <div className={classes.map}>
            <APIProvider apiKey={"AIzaSyALFwCG2TvwNdzJ7yJFWyGTfYn8fmrAhhE"}>
              <Map
                defaultZoom={12}
                defaultCenter={{ lat: 35.15, lng: 129.0756416 }}
              ></Map>
              {showDirections && <Directions from={from} to={to} mode={mode} />}
            </APIProvider>
          </div>
        </div>
        <div>
          <HomeSlide
            contents={"인기명소"}
            navi={"/tourist"}
            data={touristSpot}
          />
        </div>
        <div>
          <HomeSlide
            contents={"인기축제"}
            navi={"/festival"}
            data={festivalList}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
