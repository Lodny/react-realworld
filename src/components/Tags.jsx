import React, { useState, useEffect, useContext } from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';
import { fetchCB } from '../util';

const Tags = () => {
  const { feedDispatch } = useContext(FeedContext);
  const [tags, setTags] = useState([]);

  const getTagArticles = (data) => {
    console.log('Tags() : setTagArticles() : ', data);
    feedDispatch({ type: actions.SET_TAG_ARTICLES, payload: data });
  };

  const selectTag = (tag, e) => {
    e.preventDefault();
    console.log('Tags() : selectTag() : ', tag);
    const url = `https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=${tag}`;
    fetchCB(getTagArticles, url, { tag: tag });
  };

  // ---
  const getTags = (data) => {
    setTags(data.tags);
  };

  useEffect(() => {
    console.log('Tags() : useEffect() : tags : ', tags);
    const url = 'https://conduit.productionready.io/api/tags';
    fetchCB(getTags, url);
    // fetch(url)
    //   .then(res => {
    //     console.log('Tags() : useEffect() : fetch() : res : ', res);
    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log('Tags() : useEffect() : fetch() : data : ', data);
    //     setTags(data.tags);
    //   });
    // .catch(res => {
    //   console.log("Tags() : useEffect() : fetch() : res : ", res);
    //   return res.json();
    // });
  }, []);

  return (
    <div className='col-md-3'>
      <div className='sidebar'>
        <p>Popular Tags</p>
        <div className='tag-list'>
          {tags.length
            ? tags.map((tag, index) => (
                <a href='/#/' className='tag-pill tag-default' key={index + tag} onClick={(e) => selectTag(tag, e)}>
                  {tag}
                </a>
              ))
            : 'Loading Tags...'}
        </div>
      </div>
    </div>
  );
};

export default Tags;
