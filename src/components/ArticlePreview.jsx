import React from 'react';

const ArticlePreview = ({ article }) => {
  // console.log(article);
  return (
    <div className="article-preview">
      {article ? (
        <>
          <div className="article-meta">
            <a href="profile.html">
              <img src={article.author.image} />
            </a>
            <div className="info">
              <a href="" className="author">
                {article.author.username}
              </a>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
              <i className="ion-heart"></i> {article.favoritesCount}
            </button>
          </div>
          <a href="" className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
          </a>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default ArticlePreview;
