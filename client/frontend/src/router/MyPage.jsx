import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import classes from "./MyPage.module.css";

function MyPage() {
  const { user } = useAuth();

  return (
    <>
      <div className={classes.myPageContainer}>
        <h2>
          <span>{user.member_id}님의 활동</span>
          <span className={classes.span}>(마이페이지)</span>
        </h2>
        <div className={classes.buttonContainer}>
          <Link to="./myreview">
            <input type="button" value="후기목록" />
          </Link>
          <Link to="./mybookmark">
            <input type="button" value="찜목록" />
          </Link>
          <Link>
            <input type="button" value="정보변경" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default MyPage;
