import { Outlet, NavLink, Link } from "react-router-dom";
import classes from "./MenuLayout.module.css";
import { useAuth } from "../AuthProvider";

function MenuLayout() {
  const { user, setUser } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    await fetch(apiUrl + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    document.cookie =
      "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <>
      <header>
        <div className={classes["header-container"]}>
          <Link className={classes.logo} to="/">
            <img className={classes.logoImage} src="/logo.png" alt="logo" />
          </Link>

          <nav>
            <div className={classes["top-nav"]}>
              {!user && (
                <div>
                  <Link to="/member/login">로그인</Link>
                  <Link to="/member/join">회원가입</Link>
                </div>
              )}
              {user && (
                <div className={classes["top-nav"]}>
                  <Link to="/member/myPage">마이페이지</Link>
                  <Link onClick={handleLogout}>로그아웃</Link>
                </div>
              )}
              <div className={classes["language-select"]}>
                <i class="fa-solid fa-globe">&nbsp;</i>
                <select id="languageDropdown">
                  <option value="/">-언어-</option>
                  <option value="?lang=ko">한국어</option>
                  <option value="?lang=ja">日本語</option>
                  <option value="?lang=zh">中文</option>
                  <option value="?lang=en">English</option>
                </select>
              </div>
            </div>

            <nav className={classes["main-nav"]}>
              <ul>
                <li>
                  <NavLink
                    to="/tourist"
                    className={({ isActive }) =>
                      isActive ? classes.active : ""
                    }
                  >
                    명소
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/festival"
                    className={({ isActive }) =>
                      isActive ? classes.active : ""
                    }
                  >
                    축제
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/review"
                    className={({ isActive }) =>
                      isActive ? classes.active : ""
                    }
                  >
                    후기 게시판
                  </NavLink>
                </li>
              </ul>
            </nav>
          </nav>
        </div>
      </header>
      <hr />
      <Outlet />
    </>
  );
}

export default MenuLayout;
