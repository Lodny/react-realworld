import React, { useContext, useEffect } from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';
import axios from 'axios';

import ArticlePreview from '../components/ArticlePreview';
import Tags from '../components/Tags';
import Pagination from '../components/Pagination';

function Home({ history }) {
  const { feed, feedDispatch, user, userDispatch } = useContext(FeedContext);

  useEffect(() => {
    userDispatch({ type: actions.SET_HISTORY, payload: history });
    // if (user?.isLogin) userDispatch({ type: actions.CHANGE_ARTICLES, payload: 0 });
    console.log('Home() : useEffect() : init');

    return () => {
      console.log('Home() : useEffect() : delete articles and tag');
      feedDispatch({ type: actions.REMOVE_ARTICLES, payload: user.isLogin ? 0 : 1 });
    };
  }, []);

  useEffect(() => {
    console.log('Home() : useEffect() : feed.selected : ', feed.selected);

    const processSuccess = (data) => {
      console.log('Home() : useEffect() : processSuccess() : ', data);
      feedDispatch({ type: actions.SET_ARTICLES, payload: data });
    };

    const processError = (err) => {
      console.log('Profile() : useEffect() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
      } else {
        console.log('err', err);
      }
    };

    let url;
    if (feed.selected === 0)
      url = `https://conduit.productionready.io/api/articles/feed?limit=10&offset=${feed.currPage * 10}`;
    else
      url = `https://conduit.productionready.io/api/articles?limit=10&offset=${feed.currPage * 10}${
        feed.tag ? '&tag=' + feed.tag : ''
      }`;
    console.log('Home() : useEffect() : url : ', url);
    axios
      .get(url)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  }, [feed.selected, feed.tag, feed.currPage]);

  const articles = feed.articles?.articles;

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
                        <a
                          href='/'
                          className={'nav-link ' + (feed.selected === 0 ? 'disabled active' : '')}
                          onClick={(e) => {
                            e.preventDefault();
                            if (feed.selected === 0) return;
                            feedDispatch({ type: actions.CHANGE_ARTICLES, payload: 0 });
                          }}
                        >
                          Your Feed
                        </a>
                      </li>
                    </>
                  ) : (
                    ''
                  )}
                  <li className='nav-item'>
                    <a
                      href='/'
                      className={'nav-link ' + (feed.selected === 1 ? 'disabled active' : '')}
                      onClick={(e) => {
                        e.preventDefault();
                        if (feed.selected === 1) return;
                        feedDispatch({ type: actions.CHANGE_ARTICLES, payload: 1 });
                      }}
                    >
                      Global Feed
                    </a>
                  </li>

                  {feed.tag ? (
                    <li className='nav-item'>
                      <a href='/' className='nav-link active disabled' onClick={(e) => e.preventDefault()}>
                        #{feed.tag}
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
                  <Pagination />
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
