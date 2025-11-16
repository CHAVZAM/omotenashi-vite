import React, { useState } from "react";
import CommentSection from "./CommentSection";
import { Post } from "./BlogExperiencias";

interface PostCardProps {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  currentCommentPage: number;
  commentsPerPage: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, setPosts, currentCommentPage, commentsPerPage }) => {
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setPosts(posts =>
      posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p)
    );
  };

  const handleAddInitialComment = () => {
    if (newComment.trim()) {
      setPosts(posts =>
        posts.map(p =>
          p.id === post.id
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  {
                    id: Date.now(),
                    user: "Usuario Actual",
                    profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                    text: newComment,
                    replies: [],
                    likes: 0,
                  },
                ],
              }
            : p
        )
      );
      setNewComment("");
    }
  };

  return (
    <div className="post-card glassmorphic">
      <h3>{post.title}</h3>
      <div className="comment-input-container">
        <input
          type="text"
          placeholder="Añade un comentario a este post..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          aria-label={`Añadir comentario al post ${post.title}`}
        />
        <button onClick={handleAddInitialComment}>Enviar</button>
      </div>
      <p className="post-content">{post.content}</p>
      <img src={post.image} alt={post.title} className="post-image" />
      <div className="post-actions">
        <button
          className="like-button"
          onClick={handleLike}
          data-tooltip="Dar Like"
          aria-label="Dar like al post"
        >
          👍 {post.likes}
        </button>
        <span>Comentarios: {post.comments.length}</span>
      </div>
      <CommentSection
        postId={post.id}
        comments={post.comments}
        setPosts={setPosts}
        currentCommentPage={currentCommentPage}
        commentsPerPage={commentsPerPage}
      />
    </div>
  );
};

export default PostCard;