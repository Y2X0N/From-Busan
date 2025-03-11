import { Link } from "react-router-dom";

const HomeSlide = ({ contents, navi }) => {
  return (
    <>
      <div id="tourist-spot-container">
        <div id="tourist-spot-title">
          <span style={{ color: "rgb(98, 102, 105)", fontSize: "33px" }}>
            {contents}
          </span>
          <div class="tourist-spot-title-right">
            <Link to={navi} style={{ color: "#da202c", fontSize: "25px" }}>
              자세히
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

      <div class="image-container">
        <div class="inner" th:each="tour : ${tourist}">
          <a th:href="@{/tourist/TouristInfo(tourist_Spot_id=${tour.tourist_Spot_id})}">
            <img th:alt="${tour.main_title}" th:src="${tour.main_img_normal}" />
          </a>
          <div class="innerContent">
            <a
              th:text="${tour.main_title}"
              th:data-original="${tour.main_title}"
              id="tourMainTitle"
            ></a>
            <i
              class="far fa-heart testHeart"
              style={{ color: "#da202c", marginLeft: "10px" }}
              title="like"
            ></i>
            <span
              th:text="${tour.place_like}"
              style={{ fontSize: "24px" }}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSlide;
