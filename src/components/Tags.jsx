import React, { useState, useEffect, useContext } from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';
import axios from 'axios';

const Tags = () => {
  const { feedDispatch } = useContext(FeedContext);
  const [tags, setTags] = useState([]);

  const selectTag = (tag, e) => {
    e.preventDefault();
    console.log('Tags() : selectTag() : ', tag);
    feedDispatch({ type: actions.SET_ARTICLES_TAG, payload: tag });
  };

  useEffect(() => {
    const processSuccess = (data) => {
      console.log('Tags() : useEffect() : processSuccess() : ', data);
      setTags(data.tags);
    };

    const processError = (err) => {
      console.log('Tags() : useEffect() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
      } else {
        console.log('err', err);
      }
    };

    console.log('Tags() : useEffect() : tags : ', tags);
    axios
      .get('https://conduit.productionready.io/api/tags')
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
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
