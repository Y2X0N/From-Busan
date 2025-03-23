import { useState } from "react";
import classes from "./HomeSlide.module.css";
import { Link } from "react-router-dom";

const HomeSlide = ({ contents, navi, data }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const TOTAL_SLIDES = Math.ceil(data.length / 3);

  function clickLeft() {
    setSlideIndex((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  }

  function clickRight() {
    setSlideIndex((prev) => (prev + 1) % TOTAL_SLIDES);
  }
  return (
    <>
      <div className={classes.slideHeaderContainer}>
        <div className={classes.headerTitle}>
          <span style={{ color: "rgb(98, 102, 105)", fontSize: "33px" }}>
            {"| " + contents + " |"}
          </span>
          <div className={classes.headerControl}>
            <Link
              className={classes.link}
              to={navi}
              onClick={() => window.scrollTo(0, 0)}
            >
              자세히&#8594;
            </Link>
            <div>
              <i
                class="fa-sharp fa-solid fa-play fa-rotate-180 fa-xs imagel"
                style={{ color: "#2f4365", cursor: "pointer" }}
                onClick={clickLeft}
              ></i>
              <i
                class="fa-sharp fa-solid fa-play fa-xs imager"
                style={{ color: "#2f4365", cursor: "pointer" }}
                onClick={clickRight}
              ></i>
            </div>
          </div>
        </div>
      </div>

      <div
        className={classes.slideImageContainer}
        style={{
          transform: `translateX(-${1200 * slideIndex}px)`,
          width: `${1200 * TOTAL_SLIDES}px`,
        }}
      >
        {data.map((data) => (
          <div className={classes.cardContainer} key={Object.values(data)[0]}>
            <Link
              to={`${navi}/${Object.values(data)[0]}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <img alt={data.main_title} src={data.main_img_normal} />
            </Link>
            <div>
              <Link
                to={`${navi}/${Object.values(data)[0]}`}
                onClick={() => window.scrollTo(0, 0)}
              >
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
