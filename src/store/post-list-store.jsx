import { createContext, useEffect, useReducer, useState } from "react";

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacations. Hope to enjoy a lot. Peace out.",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Paas ho bhai",
    body: "4 saal ki masti k baad bhi ho gaye hain paas. Hard to believe.",
    reactions: 15,
    userId: "user-12",
    tags: ["Graduating", "Unbelievable"],
  },
  {
    id: 1,
    title: "His mother had always taught him",
    body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
    tags: ["history", "american", "crime"],
    reactions: {
      likes: 192,
      dislikes: 25,
    },
    views: 305,
    userId: 121,
  },
];

export const PostList = createContext({
  postlist: [],
  addPost: () => {},
  fetching: false,
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostlist = currPostList;
  if (action.type === "DELETE_POST") {
    newPostlist = currPostList.filter((item) => item.id !== action.payload.id);
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostlist = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostlist = [action.payload, ...currPostList];
  }
  return newPostlist;
};

const PostListProvider = ({ children }) => {
  const [postlist, dispatchPostList] = useReducer(postListReducer, []);
  const [fetching, setFetching] = useState(false);

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postid) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        id: postid,
      },
    });
  };

  useEffect(() => {
    setFetching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((obj) => {
        addInitialPosts(obj.posts);
        setFetching(false);
      });
  }, []);

  return (
    <PostList.Provider
      value={{
        postlist: postlist,
        addPost: addPost,
        fetching: fetching,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};
export default PostListProvider;
