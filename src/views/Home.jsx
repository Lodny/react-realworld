import React, { useContext, useEffect } from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';
import useFetch from '../hooks/useFetch';

import ArticlePreview from '../components/ArticlePreview';
import Tags from '../components/Tags';

function Home() {
  const { feeds, user, feedDispatch } = useContext(FeedContext);
  // const [loading, setLoading] = useState(false);

  const setGlobalFeeds = (data) => {
    console.log(data.articlesCount);
    feedDispatch({ type: actions.SET_FEEDS, payload: data });
    // setLoading(true);
  };

  const loading = useFetch(setGlobalFeeds, 'https://conduit.productionready.io/api/articles?limit=10&offset=0');

  useEffect(() => {
    console.log('Home() : useEffect() : user.isLogin : ', user.isLogin);

    return () => {
      console.log('Home() : useEffect() : go to other page : ');
      feedDispatch({ type: actions.SET_FEEDS, payload: {} });
    };
  }, []);

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
                    <a className='nav-link active' href=''>
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {feeds.articles ? (
                <>
                  {feeds.articles?.map((article) => (
                    <ArticlePreview article={article} key={article.createdAt} />
                  ))}
                </>
              ) : (
                <div className='article-preview'>
                  <div className='author'>Loding Articles...</div>
                </div>
              )}

              {feeds.articlesCount}
            </div>

            <Tags />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
