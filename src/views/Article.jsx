import { useEffect, useState, useContext } from 'react';
import { FeedContext } from '../store/feedStore';
import axios from 'axios';

const Article = ({ match, history }) => {
  // console.log(match, history);
  const [article, setArticle] = useState(null);

  const { store } = useContext(FeedContext);

  const handleFollow = () => {
    console.log('Article() : handleFollow() : store : ', store.isLogin);
    if (!store.isLogin) store.history?.push('/register');
  };

  useEffect(() => {
    const processSuccess = (data) => {
      console.log('Article() : useEffect() : processSuccess() : ', data.article);
      setArticle(data.article);
    };

    const processError = (err) => {
      console.log('Article() : useEffect() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
      } else {
        console.log('err', err);
      }
    };

    const url = `https://conduit.productionready.io/api/articles/${match.params.slug}`;
    axios
      .get(url)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  }, []);

  if (!article) return '';

  const dateString = new Date(article.createdAt).toDateString();

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          <h1>{article.title}</h1>

          <div className='article-meta'>
            <a href={`#/@${article.author.username}`}>
              <img src={article.author.image} alt={article.title} />
            </a>
            <div className='info'>
              <a href={`#/@${article.author.username}`} className='author'>
                {article.author.username}
              </a>
              <span className='date'>{dateString}</span>
            </div>
            <button className='btn btn-sm btn-outline-secondary' onClick={handleFollow}>
              <i className='ion-plus-round'></i>
              &nbsp; Follow {article.author.username} <span className='counter'>(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className='btn btn-sm btn-outline-primary' onClick={handleFollow}>
              <i className='ion-heart'></i>
              &nbsp; Favorite Post <span className='counter'>({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>
            <p>{article.body}</p>
            <h2 id='introducing-ionic'>Introducing RealWorld.</h2>
            <p>It's a great solution for learning how other frameworks work.</p>
          </div>
        </div>
        <hr />
        <div className='article-actions'>
          <div className='article-meta'>
            <a href={`#/@${article.author.username}`}>
              <img src={article.author.image} alt={article.title} />
            </a>
            <div className='info'>
              <a href={`#/@${article.author.username}`} className='author'>
                {article.author.username}
              </a>
              <span className='date'>{dateString}</span>
            </div>
            <button className='btn btn-sm btn-outline-secondary' onClick={handleFollow}>
              <i className='ion-plus-round'></i>
              &nbsp; Follow {article.author.username} <span className='counter'>(10)</span>
            </button>
            &nbsp;
            <button className='btn btn-sm btn-outline-primary' onClick={handleFollow}>
              <i className='ion-heart'></i>
              &nbsp; Favorite Post <span className='counter'>({article.favoritesCount})</span>
            </button>
          </div>
        </div>
        <div className='text-xs-center'>
          <a href='/#/login'>Sign in</a> or <a href='/#/register'>Sign up</a> to add comments on this article.
        </div>
        {/* <div className='row'>
          <div className='col-xs-12 col-md-8 offset-md-2'>
            <form className='card comment-form'>
              <div className='card-block'>
                <textarea className='form-control' placeholder='Write a comment...' rows='3'></textarea>
              </div>
              <div className='card-footer'>
                <img src='http://i.imgur.com/Qr71crq.jpg' className='comment-author-img' />
                <button className='btn btn-sm btn-primary'>Post Comment</button>
              </div>
            </form>

            <div className='card'>
              <div className='card-block'>
                <p className='card-text'>With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className='card-footer'>
                <a href='' className='comment-author'>
                  <img src='http://i.imgur.com/Qr71crq.jpg' className='comment-author-img' />
                </a>
                &nbsp;
                <a href='' className='comment-author'>
                  Jacob Schmidt
                </a>
                <span className='date-posted'>Dec 29th</span>
              </div>
            </div>

            <div className='card'>
              <div className='card-block'>
                <p className='card-text'>With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className='card-footer'>
                <a href='' className='comment-author'>
                  <img src='http://i.imgur.com/Qr71crq.jpg' className='comment-author-img' />
                </a>
                &nbsp;
                <a href='' className='comment-author'>
                  Jacob Schmidt
                </a>
                <span className='date-posted'>Dec 29th</span>
                <span className='mod-options'>
                  <i className='ion-edit'></i>
                  <i className='ion-trash-a'></i>
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Article;
