import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from "./PostList.module.css";

function PostList() {
  const post = useLoaderData();
  // const [post, setPost] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // 바로 fetch get를 하면 무한루프 -> 새로운 값을 받으면 다시 렌더링하기때문에 fetch도 무한루프
  // useEffect(() => {
  //   async function fetchData() {
  //     setIsLoading(true);
  //     const response = await fetch("http://localhost:8080/posts");
  //     const resData = await response.json();
  //     setPost(resData.posts);
  //     setIsLoading(false);
  //   }
  //   fetchData();
  // }, []);
  // let modalhandle;

  // if (modalIsVisible) {
  //   modalhandle = (
  //     <Modal changeModalHandler={handleModal}>
  //       <NewPost
  //         changeBodyHandler={changeBodyHandler}
  //         changeNameHandler={changeNameHandler}
  //       />
  //     </Modal>
  //   );
  // }

  return (
    /* {modalIsVisible ? (
      <Modal changeModalHandler={handleModal}>
      <NewPost
      changeBodyHandler={changeBodyHandler}
      changeNameHandler={changeNameHandler}
      />
      </Modal>
      ) : null} */
    <>
      {post.length > 0 && (
        <ul className={classes.posts}>
          {/* <Post name="Liz" post="Cute"></Post>
        <Post name="Yuna" post="Gergous" />  */}
          {post.map((data) => (
            <Post
              key={data.id}
              id={data.id}
              name={data.name}
              post={data.body}
            />
          ))}
        </ul>
      )}
      {post.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no Posts yet</h2>
          <p>Please start adding some!</p>
        </div>
      )}
      {/* {isLoading && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>Loading...</h2>
        </div>
      )} */}
    </>
  );
}

export default PostList;
