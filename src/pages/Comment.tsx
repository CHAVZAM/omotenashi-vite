import React, { useState } from "react";
import { Post, Comment as CommentType } from "./BlogExperiencias";

interface CommentProps {
  comment: CommentType;
  postId: number;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  level: number;
}

const Comment: React.FC<CommentProps> = ({ comment, postId, setPosts, level }) => {
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleCommentLike = () => {
    setPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: updateComments(post.comments, comment.id, (c) => ({
                ...c,
                likes: c.likes + 1,
              })),
            }
          : post
      )
    );
  };

  const handleReply = () => {
    setReplyTo(replyTo === comment.id ? null : comment.id);
    setReplyText("");
  };

  const handleAddComment = () => {
    if (replyText.trim()) {
      const newReply: CommentType = {
        id: Date.now(),
        user: "Usuario Actual",
        profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        text: replyText,
        replies: [],
        likes: 0,
      };

      setPosts(posts =>
        posts.map(post =>
          post.id === postId
            ? {
                ...post,
                comments: updateComments(post.comments, comment.id, (c) => ({
                  ...c,
                  replies: [...c.replies, newReply],
                })),
              }
            : post
        )
      );
      setReplyText("");
      setReplyTo(null);
    }
  };

  const updateComments = (comments: CommentType[], targetId: number, updateFn: (comment: CommentType) => CommentType): CommentType[] => {
    return comments.map(c => {
      if (c.id === targetId) {
        return updateFn(c);
      }
      if (c.replies.length > 0) {
        return { ...c, replies: updateComments(c.replies, targetId, updateFn) };
      }
      return c;
    });
  };

  return (
    <div className={`comment ${level > 0 ? "reply" : ""} ${level > 1 ? "nested-reply" : ""}`}>
      <img src={comment.profilePic} alt={comment.user} className="comment-pic" />
      <div className="comment-content">
        <strong>{comment.user}</strong>
        <p>{comment.text}</p>
        <div className="comment-actions">
          <button
            className="like-button"
            onClick={handleCommentLike}
            data-tooltip="Dar Like"
            aria-label={`Dar like al comentario de ${comment.user}`}
          >
            👍 {comment.likes}
          </button>
          <button
            className="reply-button"
            onClick={handleReply}
            data-tooltip="Responder"
            aria-label={`Responder al comentario de ${comment.user}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
        </div>
        {replyTo === comment.id && (
          <div className="reply-input">
            <input
              type="text"
              placeholder="Escribe tu respuesta..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              aria-label="Escribir respuesta"
            />
            <button onClick={handleAddComment}>Enviar</button>
            <button onClick={handleReply}>Cancelar</button>
          </div>
        )}
        {comment.replies.map((reply: CommentType) => (
          <Comment
            key={reply.id}
            comment={reply}
            postId={postId}
            setPosts={setPosts}
            level={level + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;