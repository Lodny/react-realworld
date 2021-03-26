import React, { useContext, useEffect } from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';
import axios from 'axios';

import ArticlePreview from '../components/ArticlePreview';
import Tags from '../components/Tags';
import Pagination from '../components/Pagination';

function Home({ history }) {
  const { store, dispatch } = useContext(FeedContext);

  useEffect(() => {
    dispatch({ type: actions.SET_HISTORY, payload: history });
    // if (store?.isLogin) dispatch({ type: actions.CHANGE_ARTICLES, payload: 0 });
    console.log('Home() : useEffect() : init');

    return () => {
      console.log('Home() : useEffect() : delete articles and tag');
      dispatch({ type: actions.REMOVE_ARTICLES, payload: store.isLogin ? 0 : 1 });
    };
  }, []);

  useEffect(() => {
    console.log('Home() : useEffect() : store.selected : ', store.selected);

    const processSuccess = (data) => {
      console.log('Home() : useEffect() : processSuccess() : ', data);
      dispatch({ type: actions.SET_ARTICLES, payload: data });
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
    let option = null;
    if (store.user) {
      option = {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          // 'Access-Control-Allow-Headers': 'authorization',
          authorization: `Token ${store.user.token}`,
        },
      };
    }

    if (store.selected === 0)
      url = `https://conduit.productionready.io/api/articles/feed?limit=10&offset=${store.currPage * 10}`;
    else
      url = `http://localhost:5000/api/articles?limit=10&offset=${store.currPage * 10}${
        store.tag ? '&tag=' + store.tag : ''
      }`;
    // url = `https://conduit.productionready.io/api/articles?limit=10&offset=${store.currPage * 10}${
    console.log('Home() : useEffect() : url : ', url);
    axios
      .get(url, option)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  }, [store.selected, store.tag, store.currPage]);

  const articles = store?.articles;

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
                  {store.isLogin ? (
                    <>
                      <li className='nav-item'>
                        <a
                          href='/'
                          className={'nav-link ' + (store.selected === 0 ? 'disabled active' : '')}
                          onClick={(e) => {
                            e.preventDefault();
                            if (store.selected === 0) return;
                            dispatch({ type: actions.CHANGE_ARTICLES, payload: 0 });
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
                      className={'nav-link ' + (store.selected === 1 ? 'disabled active' : '')}
                      onClick={(e) => {
                        e.preventDefault();
                        if (store.selected === 1) return;
                        dispatch({ type: actions.CHANGE_ARTICLES, payload: 1 });
                      }}
                    >
                      Global Feed
                    </a>
                  </li>

                  {store.tag ? (
                    <li className='nav-item'>
                      <a href='/' className='nav-link active disabled' onClick={(e) => e.preventDefault()}>
                        #{store.tag}
                      </a>
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </div>

              {articles ? (
                articles.length ? (
                  <>
                    {articles?.map((article) => (
                      <ArticlePreview article={article} key={article.createdAt} />
                    ))}
                    <Pagination />
                  </>
                ) : (
                  <div className='article-preview'>
                    <div className='author'>No articles are here... yet.</div>
                  </div>
                )
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
