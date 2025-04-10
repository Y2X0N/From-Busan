import classes from "./ReviewDetail.module.css";
import {
  useLoaderData,
  useNavigate,
  useSubmit,
  Form,
  useParams,
  useNavigation,
} from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useEffect, useRef, useState } from "react";

function ReviewDetail() {
  const { user } = useAuth();
  const param = useParams();
  const data = useLoaderData();
  const navigation = useNavigation();
  const navi = useNavigate();

  const content = useRef();
  const contentEdit = useRef();
  const submit = useSubmit();

  const review = data.review;
  const [isFavorite, setIsFavorite] = useState(data.isFavorite);
  const [replies, setReplies] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const replyLoad = async () => {
    const response = await fetch(apiUrl + `/reply/${param.id}`, {
      credentials: "include",
    });
    const resData = await response.json();
    setReplies(resData);
  };

  useEffect(() => {
    replyLoad();
  }, []);

  useEffect(() => {
    if (navigation.state === "idle") {
      replyLoad();
    }
  }, [navigation.state]);

  function handleReplySubmit(e) {
    e.preventDefault();
    if (!user) {
      alert("로그인 후 이용해주세요");
      return;
    }

    const contentValue = content.current.value;
    if (contentValue.length < 1) {
      alert("내용이 없습니다");
      content.current.focus();
      return;
    }
    submit(e.currentTarget);
    content.current.value = "";
    replyLoad();
  }

  async function handleReplyUpdate(replyId) {
    const body = contentEdit.current.value;
    const resBody = { content: body };

    const response = await fetch(apiUrl + `/reply/${param.id}/${replyId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resBody),
    });

    setEditMode(null);
    replyLoad();
  }

  async function handleReplyRemove(replyId) {
    const result = confirm("정말로 삭제하시겠습니까?");
    if (!result) {
      return;
    }
    const response = await fetch(apiUrl + `/reply/${param.id}/${replyId}`, {
      method: "DELETE",
      credentials: "include",
    });
    replyLoad();
  }

  function handleEditBtn(replyId) {
    setEditMode((prev) => (prev === replyId ? null : replyId));
  }

  async function handleIsFavorite() {
    const response = await fetch(`${apiUrl}${location.pathname}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const resData = await response.json();
    setIsFavorite(await resData.favorite);
  }

  function handleReturn() {
    navi("../review");
  }

  return (
    <div className={classes.writeContainer}>
      <div className={classes.writeHeader}>
        <span>{review.title}</span>
        <div className={classes.topButton}>
          <div className={classes.writeBtnContainer}>
            <input
              className={classes.writeBtn}
              type="button"
              value="목록으로"
              onClick={handleReturn}
            />
            {review.member_id === user?.member_id && (
              <input
                className={classes.writeBtn}
                type="button"
                value="글수정"
                onClick={() =>
                  navi("/review/edit", { state: { review: review } })
                }
              />
            )}
          </div>
          {user && (
            <div className={classes.buttonContainer}>
              <div className={classes.buttons}>
                <button className={classes.icon} onClick={handleIsFavorite}>
                  <img
                    src={
                      isFavorite
                        ? "https://cdn-icons-png.flaticon.com/512/803/803087.png"
                        : "/heart.svg"
                    }
                    alt="like"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <table className={classes.writeTable}>
        <tbody>
          <tr>
            <th scope="row" className={classes.th1}>
              리뷰장소
            </th>
            <td className={classes.td1}>
              <span>{review.review_place}</span>
            </td>
            <th scope="row" className={classes.th2}>
              좋아요수
            </th>
            <td className={classes.td2}>
              <span>{review.review_like}</span>
            </td>
            <th scope="row" className={classes.th2}>
              조회수
            </th>
            <td className={classes.td2}>
              <span>{review.hit}</span>
            </td>
          </tr>

          <tr>
            <th scope="row" className={classes.th1}>
              작성자
            </th>
            <td className={classes.td1}>
              <span>{review.member_id}</span>
            </td>
            <th scope="row" className={classes.th2}>
              작성일
            </th>
            <td colSpan="3" className={classes.td2}>
              <span>{review.created_time.split("T")[0]}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        className={classes.contentContainer}
        dangerouslySetInnerHTML={{ __html: review.contents }}
      />

      <div className={classes.replyContainer}>
        <div className={classes.writeReplyContainer}>
          <div className={classes.writeReplyHeader}>댓글 쓰기</div>
          <Form method="post" onSubmit={handleReplySubmit}>
            <div className={classes.writeReplyContents}>
              <textarea
                type="text"
                name="content"
                ref={content}
                placeholder="댓글을 입력하세요. 로그인상태에만 등록가능합니다"
              ></textarea>
              <button>등록</button>
            </div>
          </Form>
        </div>
      </div>
      <div className={classes.repliesContainer}>
        <span className={classes.repliesHeader}>댓글</span>
        <table className={classes.writeTable}>
          <tbody>
            {replies.length > 0 ? (
              replies.map((item, index) => (
                <tr key={index}>
                  <td scope="row">
                    <div className={classes.replyHeader}>
                      <span className={classes.spanFirst}>
                        🙏{item.member_id}
                      </span>
                      <span className={classes.spanSec}>
                        {item.created_time.split("T")[0]}
                      </span>
                      {item.member_id === user?.member_id && (
                        <span className={classes.rightControls}>
                          <input
                            className={classes.replyControlBtn}
                            type="button"
                            value={editMode === item.reply_id ? "취소" : "수정"}
                            onClick={() => handleEditBtn(item.reply_id)}
                          ></input>
                          <input
                            className={classes.replyControlBtn}
                            type="button"
                            value="삭제"
                            onClick={() => handleReplyRemove(item.reply_id)}
                          ></input>
                        </span>
                      )}
                    </div>
                    <div>{item.content}</div>
                    {editMode === item.reply_id && (
                      <div className={classes.writeEditReplyContents}>
                        <textarea
                          type="text"
                          name="content"
                          ref={contentEdit}
                          placeholder="댓글을 입력하세요. 로그인상태에만 등록가능합니다"
                        ></textarea>
                        <button
                          onClick={() => handleReplyUpdate(item.reply_id)}
                        >
                          등록
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td scope="row">
                  <div>댓글이 없습니다</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewDetail;

export async function loader({ params }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + `/review/${params.id}`, {
    credentials: "include",
  });
  const resData = await response.json();
  return resData;
}

export async function action({ request, params }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  const response = await fetch(apiUrl + `/reply/${params.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
    credentials: "include",
  });

  return null;
}
