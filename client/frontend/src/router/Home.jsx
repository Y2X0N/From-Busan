import HomeSlide from "../components/HomeSlide";
import classes from "./Home.module.css";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

function Home() {
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
              <input type="text" placeholder="Enter location" />
            </div>
            <div>
              <label htmlFor="end"> 도착지: </label>
              <input type="text" placeholder="Enter location" />
            </div>
            <div>
              <strong>여행모드: </strong>
              <select>
                <option value="TRANSIT">통행</option>
              </select>
              <input value="길찾기" type="button" />
              <div id="popup"></div>
            </div>
          </div>
          <div className={classes.map}>
            <APIProvider
              apiKey={"AIzaSyALFwCG2TvwNdzJ7yJFWyGTfYn8fmrAhhE"}
              onLoad={() => console.log("Maps API has loaded.")}
            >
              <Map
                defaultZoom={13}
                defaultCenter={{ lat: 35.115229, lng: 129.039702 }}
                onCameraChanged={(ev) =>
                  console.log(
                    "camera changed:",
                    ev.detail.center,
                    "zoom:",
                    ev.detail.zoom
                  )
                }
              ></Map>
            </APIProvider>
          </div>
        </div>
        <div>
          <HomeSlide contents={"인기명소"} navi={"/tourspot"} />
        </div>
        <div>
          <HomeSlide contents={"인기축제"} navi={"/festival"} />
        </div>
      </div>
    </>
  );
}

export default Home;
