// import { useAuthentication } from "../../authentication/context/AuthenticationContextProvider";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../../authentication/context/AuthenticationContextProvider";
import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar";
import { RightSidebar } from "../../components/RightSidebar/RightSidebar";
import classes from "./Feed.module.scss";
import { Button } from "../../../../components/Button/Button";
import { useEffect, useState } from "react";
import { Post } from "../../components/Post/Post";
import { Modal } from "../../components/Modal/Modal";

export function Feed() {
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPostingModal, setShowPostingModal] = useState(false);
  const [feedContent, setFeedContent] = useState<"all" | "connexions">(
    "connexions"
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL +
            "/api/v1/feed" +
            (feedContent === "connexions" ? "" : "/posts"),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    };
    fetchPosts();
  }, [feedContent]);

  const handlePost = async (content: string, picture: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/feed/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content, picture }),
        }
      );
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
      const data = await res.json();
      setPosts([...posts, data]);
      console.log("add data : ", data);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        console.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <LeftSidebar />
      </div>

      <div className={classes.center}>
        <div className={classes.posting}>
          <button
            onClick={() => {
              navigate(`/profile/${user?.id}`);
            }}
          >
            <img
              src={user?.profilePicture || "/avatar.png"}
              className={`${classes.top} ${classes.avatar}`}
              alt=""
            />
          </button>
          <Button outline onClick={() => setShowPostingModal(true)}>
            Start a post
          </Button>
          <Modal
            title="Creating a post"
            onSubmit={handlePost}
            showModal={showPostingModal}
            setShowModal={setShowPostingModal}
          />
        </div>

        <div className={classes.header}>
          <button
            className={feedContent === "all" ? classes.active : ""}
            onClick={() => setFeedContent("all")}
          >
            All
          </button>
          <button
            className={feedContent === "connexions" ? classes.active : ""}
            onClick={() => setFeedContent("connexions")}
          >
            Feed
          </button>
        </div>

        {error && <div className={classes.error}>{error}</div>}

        <div className={classes.feed}>
          {posts.map((post) => (
            <Post key={post.id} post={post} setPosts={setPosts} />
          ))}
        </div>
      </div>

      <div className={classes.right}>
        <RightSidebar />
      </div>
    </div>
  );
}
