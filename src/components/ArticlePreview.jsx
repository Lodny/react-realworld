import React, { useContext } from 'react';
import { FeedContext } from '../store/feedStore';

const ArticlePreview = ({ article }) => {
  // console.log(article);
  const { user } = useContext(FeedContext);

  const handleFollow = () => {
    console.log('Profile() : handleFollow() : user : ', user.isLogin);
    if (!user.isLogin) user.history?.push('/register');
  };

  const dateString = new Date(article.createdAt).toDateString();

  return (
    <div className='article-preview'>
      {article ? (
        <>
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
            <button onClick={handleFollow} className='btn btn-outline-primary btn-sm pull-xs-right'>
              <i className='ion-heart'></i> {article.favoritesCount}
            </button>
          </div>
          <a href={`#/article/${article.slug}`} className='preview-link'>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <ul className='tag-list'>
              {article.tagList.map((tag) => (
                <li className='tag-default tag-pill tag-outline ng-binding ng-scope' key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </a>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default ArticlePreview;
