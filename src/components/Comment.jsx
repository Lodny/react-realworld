import * as React from 'react';
import { FeedContext } from '../store/feedStore';
import axios from 'axios';
// import * as actions from '../actions/feedAction.js';

const Comment = ({ slug }) => {
  console.log('Comment() : slug : ', slug);

  const { store } = React.useContext(FeedContext);
  const [input, setInput] = React.useState('');
  const [comments, setComments] = React.useState([]);

  const addComment = () => {
    console.log('Comment() : addComment() : store : ', store.isLogin);

    const processSuccess = (data) => {
      console.log('Comment() : addComment() : processSuccess() : ', data);
      // history.push(`/article/${data.comment.slug}`);
    };

    const processError = (err) => {
      console.log('Comment() : addComment() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
      } else {
        console.log('err', err);
      }
    };

    const url = `http://localhost:5000/api/articles/${slug}/comments`;
    console.log('Comment() : addComment() : url : ', url);
    const option = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Headers': 'authorization',
        authorization: `Token ${store.user.token}`,
      },
    };
    const body = {
      comment: {
        body: input,
      },
    };

    axios
      .post(url, body, option)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  };

  React.useEffect(() => {
    if (slug) {
      const processSuccess = (data) => {
        console.log('Article() : useEffect() : processSuccess() : comments : ', data.comments);
        setComments(data.comments);
      };

      const processError = (err) => {
        console.log('Article() : useEffect() : processError() : comments : ', err);
        if (err?.status) {
          console.log('status', err.status, err.data.errors);
        } else {
          console.log('err', err);
        }
      };

      const url = `http://localhost:5000/api/articles/${slug}/comments`;
      axios
        .get(url)
        .then((res) => processSuccess(res.data))
        .catch((err) => processError(err?.response || err?.request || err.message));
    }
  }, []);

  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        {store.isLogin ? (
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
              <button className='btn btn-sm btn-primary' onClick={addComment}>
                Post Comment
              </button>
            </div>
          </form>
        ) : (
          ''
        )}

        {comments.length
          ? comments.map((comment) => {
              <div className='card'>
                <div className='card-block'>
                  <p className='card-text'>{comment.body}</p>
                </div>
                <div className='card-footer'>
                  <a href={`#/@${comment.author.username}`} className='comment-author'>
                    <img src={comment.author.image} className='comment-author-img' alt={comment.autohr.username} />
                  </a>
                  &nbsp;
                  <a href={`#/@${comment.author.username}`} className='comment-author'>
                    {comment.author.username}
                  </a>
                  <span className='date-posted'>{new Date(comment.createdAt).toDateString()}</span>
                  <span className='mod-options'>
                    <i className='ion-edit'></i>
                    <i className='ion-trash-a'></i>
                  </span>
                </div>
              </div>;
            })
          : ''}
      </div>
    </div>
  );
};

export default Comment;
