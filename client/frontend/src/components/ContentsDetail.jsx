import classes from "./ContentsDetail.module.css";

const ContentsDetail = () => {
  return (
    <>
      <div className={classes.contentsContainer}>
        <div className={classes.searchContainer}>
          <div className={classes.searchBar}>
            <input
              id="searchText"
              list="searchOptions"
              type="search"
              name="searchText"
              placeholder="명소를 입력해주세요."
            />
            {/* <datalist id="searchOptions">
              <option th:each="festival : ${searchFes}">
                <span
                  th:text="${festival.main_title}"
                  id="searchName"
                  th:data-original="*{festival.main_title}"
                ></span>
              </option>
            </datalist> */}
            <button type="button">검색</button>
          </div>
        </div>

        <div class="container">Contents</div>

        <div id="navigator" class="pageNumber">
          PageNavi
        </div>
      </div>
    </>
  );
};

export default ContentsDetail;
