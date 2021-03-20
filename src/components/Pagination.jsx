import { useContext } from 'react';
import { FeedContext } from '../store/feedStore';
import * as actions from '../actions/feedAction';

const Pagination = () => {
  const { feed, feedDispatch } = useContext(FeedContext);

  const handlePage = (page) => {
    console.log('Pagination() : handlePage() : page : ', page);
    feedDispatch({ type: actions.SET_CURR_PAGE, payload: page });
  };

  const pageCount = Math.floor(feed.articles?.articlesCount / 10);
  if (pageCount === 0) return '';

  return (
    <div className='ng-isolate-scope'>
      <ul className='pagination'>
        {[...Array(pageCount).keys()].map((page) => (
          <li
            className={'page-item ng-scope ' + (feed.currPage === page ? 'active' : '')}
            onClick={() => handlePage(page)}
            key={page}
          >
            <a className='page-link ng-binding' href='/#/'>
              {page + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
