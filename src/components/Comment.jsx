import * as React from 'react';
import { FeedContext } from '../store/feedStore';
import axios from 'axios';
// import * as actions from '../actions/feedAction.js';

const Comment = ({ slug }) => {
  console.log('Comment() : slug : ', slug);

  const { store } = React.useContext(FeedContext);
  const [input, setInput] = React.useState('');
  const [comments, setComments] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  const addComment = () => {
    console.log('Comment() : addComment() : store.user : ', store.user);
    setInput('');

    const processSuccess = (data) => {
      console.log('Comment() : addComment() : processSuccess() : ', data);
      setRefresh(!refresh);
    };

    const processError = (err) => {
      console.log('Comment() : addComment() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data);
      }
    };

    const url = `${store.serverBase()}/api/articles/${slug}/comments`;
    console.log('Comment() : addComment() : url : ', url);
    const body = {
      comment: {
        body: input,
      },
    };
    axios
      .post(url, body, store.tokenHeader(store.user))
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  const deleteComment = (id) => () => {
    console.log('Comment() : deleteComment() : id : ', id);

    const processSuccess = (data) => {
      console.log('Comment() : deleteComment() : processSuccess() : ', data);
      setRefresh(!refresh);
    };

    const processError = (err) => {
      console.log('Comment() : deleteComment() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data);
      }
    };

    const url = `${store.serverBase()}/api/articles/${slug}/comments/${id}`;
    console.log('Comment() : deleteComment() : url : ', url);

    axios
      // .delete(url, option)
      .delete(url, store.tokenHeader(store.user))
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  React.useEffect(() => {
    if (slug) {
      const processSuccess = (data) => {
        console.log('Article() : useEffect() : processSuccess() : comments : ', data.comments);
        if (data.comments) setComments(data.comments);
      };

      const processError = (err) => {
        console.log('Article() : useEffect() : processError() : comments : ', err);
        if (err?.status) {
          console.log('status', err.status, err.data);
        }
      };

      const url = `${store.serverBase()}/api/articles/${slug}/comments`;
      console.log('Comment() : useEffect() : url : ', url);
      axios
        .get(url)
        .then((res) => processSuccess(res.data))
        .catch((err) => processError(err?.response || err?.request || err.message));
    }
  }, [refresh]);

  return (
    <>
      {store.user ? (
        <form className='card comment-form'>
          <div className='card-block'>
            <textarea
              className='form-control'
              placeholder='Write a comment...'
              rows='3'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></textarea>
          </div>
          <div className='card-footer'>
            <img src={store.user.image} className='comment-author-img' alt={store.user.username} />
            <button className='btn btn-sm btn-primary' type='button' onClick={addComment}>
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        ''
      )}

      {comments.length
        ? comments.map((comment) => {
            return (
              <div className='card' key={comment.id}>
                <div className='card-block'>
                  <p className='card-text'>{comment.body}</p>
                </div>
                <div className='card-footer'>
                  <a href={`#/@${comment.author.username}`} className='comment-author'>
                    <img src={comment.author.image} className='comment-author-img' alt={comment.author.username} />
                  </a>
                  &nbsp;
                  <a href={`#/@${comment.author.username}`} className='comment-author'>
                    {comment.author.username}
                  </a>
                  <span className='date-posted'>{new Date(comment.createdAt).toDateString()}</span>
                  {store.user && store.user.username === comment.author.username ? (
                    <span className='mod-options'>
                      {/* <i className='ion-edit'></i> */}
                      <i className='ion-trash-a' onClick={deleteComment(comment.id)}></i>
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            );
          })
        : ''}
    </>
  );
};

export default Comment;
