import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

const Tags = () => {
  const [tags, setTags] = useState([]);

  const setPopularTags = (data) => {
    setTags(data.tags);
    // console.log('Tags() : setPopularTags() : ', data.tags);
  };

  const loading = useFetch(setPopularTags, 'https://conduit.productionready.io/api/tags');

  // useEffect(() => {
  //   console.log('FeedStore() : upadated feeds');
  // }, [feeds]);

  return (
    <div className='col-md-3'>
      <div className='sidebar'>
        <p>Popular Tags</p>
        <div className='tag-list'>
          {tags.length
            ? tags.map((tag, index) => (
                <a href='' className='tag-pill tag-default' key={index + tag}>
                  {tag}
                </a>
              ))
            : 'Loading Tags...'}

          {/* <a href='' className='tag-pill tag-default'>
            programming
          </a>
          <a href='' className='tag-pill tag-default'>
            javascript
          </a>
          <a href='' className='tag-pill tag-default'>
            emberjs
          </a>
          <a href='' className='tag-pill tag-default'>
            angularjs
          </a>
          <a href='' className='tag-pill tag-default'>
            react
          </a>
          <a href='' className='tag-pill tag-default'>
            mean
          </a>
          <a href='' className='tag-pill tag-default'>
            node
          </a>
          <a href='' className='tag-pill tag-default'>
            rails
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Tags;
