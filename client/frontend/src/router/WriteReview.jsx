import classes from "./WriteReview.module.css";

function WriteReview() {
  return (
    <div class="write-container">
      <form
        action="write"
        method="post"
        enctype="multipart/form-data"
        th:object="${writeForm}"
      >
        <div class="write-header">
          리뷰쓰기
          <span>
            <input
              class="write-btn"
              type="button"
              onclick="location.href='/review/list'"
              data-value="#{alert.onlist}"
              th:value="#{alert.onlist}"
            />
            <input
              class="write-btn"
              type="submit"
              data-value="#{alert.Registration}"
              th:value="#{alert.Registration}"
            />
            <input
              class="write-btn"
              type="reset"
              data-value="#{alert.cancel}"
              th:value="#{alert.cancel}"
            />
          </span>
        </div>
        <table class="write-table">
          <th>리뷰장소</th>
          <td>
            <input
              type="text"
              list="searchOptions"
              th:field="*{review_place}"
              style={{ width: "600px" }}
            />
            <datalist id="searchOptions">
              <option th:each="main_title : ${findAllName}">
                <span
                  th:text="${main_title}"
                  id="main_title"
                  th:data-original="${main_title}"
                ></span>
              </option>
            </datalist>
            <div
              class="error"
              th:if="${#fields.hasErrors('review_place')}"
              th:errors="*{review_place}"
            ></div>
            <div
              class="error"
              th:if="${placeError != null}"
              th:text="${placeError}"
            ></div>
          </td>

          <tr>
            <th>제목</th>
            <td>
              <input
                type="text"
                th:field="*{title}"
                style={{ width: "600px" }}
              />
              <div class="error" th:errors="*{title}"></div>
            </td>
          </tr>
        </table>
        <div class="error" th:errors="*{contents}"></div>
        <div id="summer-box">
          <textarea id="summernote" name="contents"></textarea>
        </div>
      </form>
    </div>
  );
}

export default WriteReview;
