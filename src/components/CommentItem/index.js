// Write your code here
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLike, deleteComment} = props
  const {id, name, comment, isLiked, date, initialClassName} = commentDetails

  const isLikedStatus = isLiked ? '' : 'status-blue'

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const onDeleteComment = () => {
    deleteComment(id)
  }

  const onClickLike = () => {
    toggleIsLike(id)
  }

  return (
    <li className="list-item">
      <div className="container">
        <span className={`single-letter ${initialClassName}`}>{name[0]}</span>
        <div className="name-container">
          <div className="date-name">
            <p className="name">{name}</p>
            <p className="date-time">{date}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>

      <div className="like-icon-container">
        <button type="button" className="delete-button" onClick={onClickLike}>
          <img src={likeImgUrl} className="like-icon" alt="like" />
        </button>
        <div className="icon-container">
          <p className={`status ${isLikedStatus}`}>Like</p>
          <button
            type="button"
            className="delete-button"
            onClick={onDeleteComment}
            testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="delete-icon"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default CommentItem
