import classes from "./Post.module.css";
import { Link } from "react-router-dom";

// const name = ["Max", "Rogan"];

function Post(props) {
  //   const chosenName = Math.random() > 0.5 ? name[0] : name[1];

  return (
    <li className={classes.post}>
      <Link to={props.id}>
        <p className={classes.author}>{props.name}</p>
        <p className={classes.text}>{props.post}</p>
      </Link>
    </li>
  );
}

export default Post;
