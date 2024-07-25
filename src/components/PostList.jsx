import { useContext } from "react";
import { PostList as postlistdata } from "../store/post-list-store";
import Post from "./Post";

const WelcomeMessage = () => {
  return (
    <center className="welcome-message">
      <h1>
        Welcome mere bhai, chal post me jaa kar karde puch post jaldi jaldi
      </h1>
    </center>
  );
};

const LoadingSpnner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

const PostList = () => {
  const { postlist, fetching } = useContext(postlistdata);

  

  return (
    <>
      {fetching ? <LoadingSpnner/> : postlist.length != 0 ? (
        postlist.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <WelcomeMessage />
      )}
    </>
  );
};

export default PostList;
