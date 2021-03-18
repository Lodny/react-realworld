import React, { useContext, useEffect, useState } from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';
import { fetchCB } from '../util';

import ArticlePreview from '../components/ArticlePreview';
import Tags from '../components/Tags';

function Home() {
  const { feed, user, feedDispatch } = useContext(FeedContext);
  const [refresh, setRefresh] = useState(false);

  const getGlobalArticles = (data) => {
    console.log('Home() : setGlobalArticles() : ', data);
    feedDispatch({ type: actions.SET_GLOBAL_ARTICLES, payload: data });
  };

  useEffect(() => {
    console.log('Home() : useEffect() : feed : ', feed);
    const url = 'https://conduit.productionready.io/api/articles?limit=10&offset=0';
    fetchCB(getGlobalArticles, url);

    return () => {
      console.log('Home() : useEffect() : delete articles and go to other page : ');
      feedDispatch({ type: actions.REMOVE_ALL_ARTICLES, payload: {} });
      // feedDispatch({ type: actions.SET_GLOBAL_ARTICLES, payload: {} });
    };
  }, [refresh]);

  let articles = null;
  let tag = null;
  switch (feed.showArticles) {
    case actions.SET_GLOBAL_ARTICLES:
      articles = feed.global.articles;
      break;

    case actions.SET_TAG_ARTICLES:
      articles = feed.tag.articles;
      tag = feed.tag.tag;
      console.log('Home() : feed.tag : ', feed.tag);
      break;

    case actions.SET_YOUR_ARTICLES:
      articles = feed.your.articles;
      break;

    default:
      break;
  }

  return (
    <div>
      <div className='home-page'>
        <div className='banner'>
          <div className='container'>
            <h1 className='logo-font'>conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className='container page'>
          <div className='row'>
            <div className='col-md-9'>
              <div className='feed-toggle'>
                <ul className='nav nav-pills outline-active'>
                  {user.isLogin ? (
                    <>
                      <li className='nav-item'>
                        <a className='nav-link disabled' href=''>
                          Your Feed
                        </a>
                      </li>
                    </>
                  ) : (
                    ''
                  )}
                  <li className='nav-item'>
                    <a
                      className={'nav-link ' + (!tag ? 'active' : '')}
                      href='/#/'
                      onClick={(e) => {
                        e.preventDefault();
                        setRefresh(!refresh);
                      }}
                    >
                      Global Feed
                    </a>
                  </li>

                  {tag ? (
                    <li className='nav-item'>
                      <a className='nav-link active disabled' href='/#/' onClick={(e) => e.preventDefault()}>
                        #{tag}
                      </a>
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </div>

              {articles ? (
                <>
                  {articles?.map((article) => (
                    <ArticlePreview article={article} key={article.createdAt} />
                  ))}
                </>
              ) : (
                <div className='article-preview'>
                  <div className='author'>Loding Articles...</div>
                </div>
              )}
            </div>

            <Tags />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
