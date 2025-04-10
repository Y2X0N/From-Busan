import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import classes from "./WriteReview.module.css";
import { useRef, useState } from "react";

function WriteReview() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const navi = useNavigate();
  const location = useLocation();
  const places = useLoaderData();
  const noteContent = useRef();
  const contentValue = useRef();
  const reviewPlace = useRef();
  const reviewTitle = useRef();
  const [errorTitle, setErrorTitle] = useState("");
  const [errorPlace, setErrorPlace] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const submit = useSubmit();

  const reviewData = location.state?.review;
  const content = reviewData?.contents;

  function handleReturn() {
    navi("../review");
  }

  async function handleReviewDelete(reviewId) {
    const result = confirm("정말로 삭제하시겠습니까?");

    if (!result) {
      return;
    }

    const response = await fetch(apiUrl + `/review/delete/${reviewId}`, {
      method: "POST",
      credentials: "include",
    });
    return navi("../review");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorContent("");
    setErrorPlace("");
    setErrorTitle("");

    if (!reviewPlace.current.value) {
      setErrorPlace("*리뷰할 장소를 선택해주세요");
      reviewPlace.current.focus();
      return;
    }

    const isPlaceValid = places.some(
      (item) => item === reviewPlace.current.value
    );

    if (!isPlaceValid) {
      setErrorPlace("*정확한 리뷰장소 선택해주세요");
      reviewPlace.current.focus();
      return;
    }

    if (!reviewTitle.current.value) {
      setErrorTitle("*제목을 입력해주세요");
      reviewTitle.current.focus();
      return;
    }

    function extractTextFromHTML() {
      const tmp = document.createElement("div");
      tmp.innerHTML = noteContent.current;
      return tmp.textContent || tmp.innerText || "";
    }

    const result = extractTextFromHTML();

    if (!result) {
      setErrorContent("*내용을 입력해주세요");
      return;
    }

    contentValue.current.value = noteContent.current;

    submit(e.currentTarget);
  }

  return (
    <div className={classes.writeContainer}>
      <Form method="post" onSubmit={handleSubmit}>
        <div className={classes.writeHeader}>
          <span>리뷰쓰기</span>
          <div className={classes.writeBtnContainer}>
            <input
              className={classes.writeBtn}
              type="button"
              value="목록으로"
              onClick={handleReturn}
            />
            <input
              className={classes.writeBtn}
              type="submit"
              value={location.pathname === "/review/edit" ? "글수정" : "등록"}
            />
            <input
              className={classes.writeBtn}
              type="reset"
              value={location.pathname === "/review/edit" ? "글삭제" : "취소"}
              onClick={() => handleReviewDelete(reviewData.review_id)}
            />
          </div>
        </div>
        <table className={classes.writeTable}>
          <tbody>
            <tr>
              <th scope="row">리뷰장소</th>
              <td>
                <input
                  type="text"
                  list="searchOptions"
                  style={{ width: "600px" }}
                  name="review_place"
                  defaultValue={reviewData ? reviewData.review_place : ""}
                  readOnly={reviewData ? true : false}
                  ref={reviewPlace}
                />
                <datalist id="searchOptions">
                  {places.map((item) => (
                    <option key={item} value={item}></option>
                  ))}
                </datalist>
                <div className={classes.error}>{errorPlace}</div>
              </td>
            </tr>

            <tr>
              <th scope="row">제목</th>
              <td>
                <input
                  type="text"
                  style={{ width: "600px" }}
                  name="title"
                  defaultValue={reviewData ? reviewData.title : ""}
                  ref={reviewTitle}
                />
                <div className={classes.error}>{errorTitle}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={classes.error}>{errorContent}</div>
        <div>
          <ReactSummernoteLite
            id="sample"
            height="500px"
            placeholder="내용을 입력해주세요"
            onInit={({ note }) => {
              note.summernote("justifyLeft");
              {
                reviewData ? note.summernote("pasteHTML", `${content}`) : null;
              }
            }}
            onChange={(content) => (noteContent.current = content)}
          />
        </div>
        <input type="hidden" name="contents" ref={contentValue} />
        <input
          type="hidden"
          name="actionType"
          value={reviewData ? "update" : "create"}
        />
        <input
          type="hidden"
          name="reviewId"
          value={reviewData ? reviewData.review_id : ""}
        />
      </Form>
    </div>
  );
}

export default WriteReview;

export async function loader() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + "/review/places");
  const resData = await response.json();
  return resData;
}

export async function action({ request }) {
  let apiUrl = import.meta.env.VITE_API_URL;
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log(postData);
  if (postData.actionType === "update") {
    const response = await fetch(apiUrl + "/review/update", {
      method: "PUT",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  } else {
    const response = await fetch(apiUrl + "/review/write", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  return redirect("../review");
}
