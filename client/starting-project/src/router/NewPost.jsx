import classes from "./NewPost.module.css";
import { useState } from "react";
import Modal from "../components/Modal";
import { Form, Link, redirect } from "react-router-dom";

function NewPost() {
  // const [enterBody, setEnterBody] = useState("idoit");

  // function changeBodyHandler(event) {
  //   console.log(event.target.value);
  //   setEnterBody(event.target.value);
  // }

  // const [enterBody, setEnterBody] = useState("I'am Ironman");
  // const [enterName, setEnterName] = useState("IronMan");

  // function changeBodyHandler(event) {
  //   // console.log(event.target.value);
  //   setEnterBody(event.target.value);
  // }
  // function changeNameHandler(event) {
  //   setEnterName(event.target.value);
  // }

  // function onSubmitHandler(event) {
  //   event.preventDefault();
  //   const data = {
  //     body: enterBody,
  //     name: enterName,
  //   };
  //   onAddPost(data);
  //   onCancel();
  // }

  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} name="body" />
        </p>
        <p>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" required name="name" />
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); //이건 키-벨류로 만들어줌, 아니면 formData.get 이런식
  await fetch("http://localhost:8080/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/");
}
