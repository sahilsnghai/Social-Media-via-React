import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import CreatePost from "./components/CreatePost";
import Footer from "./components/Footer";
import Headers from "./components/Headers";
import PostList from "./components/PostList";
import Sidebar from "./components/Sidebar";
import PostListProvider from "./store/post-list-store";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        ></Sidebar>
        <div className="content">
          <Headers></Headers>
          {selectedTab === "Home" ? <PostList></PostList> : <CreatePost />}

          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
