import React, { useState } from "react";
import Comment from "./Comment";
import { Post, Comment as CommentType } from "./BlogExperiencias";

interface CommentSectionProps {
  postId: number;
  comments: CommentType[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  currentCommentPage: number;
  commentsPerPage: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, setPosts, currentCommentPage, commentsPerPage }) => {
  const [localPage, setLocalPage] = useState(currentCommentPage);

  const indexOfLastComment = localPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const paginateComments = (pageNumber: number) => {
    setLocalPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, localPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => paginateComments(1)} className={localPage === 1 ? "active" : ""}>
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginateComments(i)}
          className={localPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button key={totalPages} onClick={() => paginateComments(totalPages)} className={localPage === totalPages ? "active" : ""}>
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="comments-section">
      <h4 className="section-title">Comentarios</h4>
      {currentComments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          postId={postId}
          setPosts={setPosts}
          level={0}
        />
      ))}
      <div className="pagination">
        <button
          onClick={() => paginateComments(localPage - 1)}
          disabled={localPage === 1}
          className="pagination-arrow"
        >
          Anterior
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => paginateComments(localPage + 1)}
          disabled={localPage === totalPages}
          className="pagination-arrow"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CommentSection;