import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'

import './index.css'
import CommentItem from '../CommentItem/index'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    commentList: [],
    name: '',
    comment: '',
    commentCount: 0,
  }

  onAddComment = event => {
    event.preventDefault()

    const {name, comment} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: formatDistanceToNow(new Date()),
      isLiked: true,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      commentCount: prevState.commentCount + 1,
      name: '',
      comment: '',
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentList} = this.state
    const updatedCommentsList = commentList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState(prevState => ({
      commentList: updatedCommentsList,
      commentCount: prevState.commentCount - 1,
    }))
  }

  render() {
    const {name, comment, commentCount, commentList} = this.state

    return (
      <div className="comments-app-container">
        <div className="comments-container">
          <div>
            <h1 className="comments-heading">Comments</h1>
            <form className="form-container" onSubmit={this.onAddComment}>
              <p className="label-ele">Say Something about 4.O Technologies</p>
              <input
                value={name}
                className="input"
                placeholder="Your Name"
                onChange={this.onChangeName}
              />
              <textarea
                cols="30"
                rows="5"
                value={comment}
                placeholder="Your Comment"
                className="textarea"
                onChange={this.onChangeComment}
              />
              <div>
                <button type="submit" className="button">
                  Add Comment
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-image"
          />
        </div>

        <div className="comment-body-container">
          <div className="comments-count-container">
            <button type="button" className="btn-count">
              {commentCount}
            </button>
            <span className="span-ele">Comments</span>
          </div>

          <ul className="contacts-table">
            {commentList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLike={this.toggleIsLike}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
