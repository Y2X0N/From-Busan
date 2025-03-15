import classes from "./HomeSlide.module.css";
import { Link } from "react-router-dom";

const HomeSlide = ({ contents, navi, data }) => {
  return (
    <>
      <div className={classes.slideHeaderContainer}>
        <div className={classes.headerTitle}>
          <span style={{ color: "rgb(98, 102, 105)", fontSize: "33px" }}>
            {"| " + contents + " |"}
          </span>
          <div className={classes.headerControl}>
            <Link className={classes.link} to={navi}>
              자세히&#8594;
            </Link>
            <div>
              <i
                class="fa-sharp fa-solid fa-play fa-rotate-180 fa-xs imagel"
                style={{ color: "#2f4365" }}
              ></i>
              <i
                class="fa-sharp fa-solid fa-play fa-xs imager"
                style={{ color: "#2f4365" }}
              ></i>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.slideImageContainer}>
        {data.map((data) => (
          <div className={classes.cardContainer} key={Object.values(data)[0]}>
            <Link to={Object.values(data)[0]}>
              <img alt={data.main_title} src={data.main_img_normal} />
            </Link>
            <div>
              <Link to={Object.values(data)[0]}>
                <span className={classes.innerContent}>{data.main_title}</span>
              </Link>
              <i
                class="far fa-heart testHeart"
                style={{ color: "#da202c", marginLeft: "10px" }}
              ></i>
              <span text={data.place_like} style={{ fontSize: "24px" }}></span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeSlide;
