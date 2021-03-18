import React from 'react';

const ArticlePreview = ({ article }) => {
  // console.log(article);
  // const dateString = new Date(article.createdAt).toLocaleDateString();
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
            <button className='btn btn-outline-primary btn-sm pull-xs-right'>
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

{
  /* 
<a ui-sref="app.article({ slug: $ctrl.article.slug })" class="preview-link" href="#/article/jatalal-test-article-olj6ms">
    <h1 ng-bind="$ctrl.article.title" class="ng-binding">Jatalal Test Article</h1>
    <p ng-bind="$ctrl.article.description" class="ng-binding">This article is for testing api from jathalal</p>
    <span>Read more...</span>
    <ul class="tag-list">
      <!-- ngRepeat: tag in $ctrl.article.tagList --><li class="tag-default tag-pill tag-outline ng-binding ng-scope" ng-repeat="tag in $ctrl.article.tagList">
        test
      </li><!-- end ngRepeat: tag in $ctrl.article.tagList --><li class="tag-default tag-pill tag-outline ng-binding ng-scope" ng-repeat="tag in $ctrl.article.tagList">
        fun
      </li><!-- end ngRepeat: tag in $ctrl.article.tagList --><li class="tag-default tag-pill tag-outline ng-binding ng-scope" ng-repeat="tag in $ctrl.article.tagList">
        jatha
      </li><!-- end ngRepeat: tag in $ctrl.article.tagList -->
    </ul>
  </a> */
}
