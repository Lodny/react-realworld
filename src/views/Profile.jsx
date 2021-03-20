import { useState, useEffect, useContext } from 'react';
import ArticlePreview from '../components/ArticlePreview';
import axios from 'axios';
import { FeedContext } from '../store/feedStore';

const Profile = ({ match, history }) => {
  // console.log('Profile() : match : ', match);
  // console.log('Profile() : username : ', match.params.username);

  const { user } = useContext(FeedContext);

  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState(null);
  const [selected, setSelected] = useState('my');

  const changeArticles = (select, e) => {
    e.preventDefault();
    console.log('Profile() : changeArticles() : ', select);
    if (selected === select) return;

    setArticles(null);
    setSelected(select);
  };

  const handleFollow = () => {
    console.log('Profile() : handleFollow() : user : ', user.isLogin);
    if (!user.isLogin) history.push('/register');
  };

  useEffect(() => {
    // console.log('Profile() : useEffect() : profile : ', profile);
    // console.log('Profile() : useEffect() : articles : ', articles);

    const processSuccess = (data) => {
      console.log('Profile() : useEffect() : processSuccess() : ', data.profile);
      setProfile(data.profile);
    };

    const processError = (err) => {
      console.log('Profile() : useEffect() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
      } else {
        console.log('err', err);
      }
    };

    let url = 'https://conduit.productionready.io/api/profiles/' + match.params.username;
    axios
      .get(url)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  }, []);

  useEffect(() => {
    const processSuccess = (data) => {
      console.log('Profile() : useEffect2() : processSuccess() : ', data.articles);
      setArticles(data.articles);
    };

    const processError = (err) => {
      console.log('Profile() : useEffect2() : processError() : ', err);
      if (err?.status) {
        console.log('status', err.status, err.data.errors);
      } else {
        console.log('err', err);
      }
    };

    let url;
    if (selected === 'my')
      url = `https://conduit.productionready.io/api/articles?author=${match.params.username}&limit=5&offset=0`;
    else url = `https://conduit.productionready.io/api/articles?favorited=${match.params.username}&limit=5&offset=0`;
    axios
      .get(url)
      .then((res) => processSuccess(res.data))
      .catch((err) => processError(err?.response || err?.request || err.message));
  }, [selected]);

  if (null === profile) {
    console.log('Profile() : profile === null');
    return '';
  }

  return (
    <div className='profile-page'>
      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              <img src={profile.image} className='user-img' alt={profile.bio} />
              <h4>{profile.username}</h4>
              <p>
                {/* Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games */}
                {profile.bio}
              </p>
              <button className='btn btn-sm btn-outline-secondary action-btn' onClick={handleFollow}>
                <i className='ion-plus-round'></i>
                &nbsp; Follow {profile.username}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <a
                    className={'nav-link ' + (selected === 'my' ? 'active disabled' : '')}
                    href={`/#/@${profile.username}`}
                    onClick={(e) => changeArticles('my', e)}
                  >
                    My Articles
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className={'nav-link ' + (selected !== 'my' ? 'active disabled' : '')}
                    href={`/#/@${profile.username}/favorites`}
                    onClick={(e) => changeArticles('favorites', e)}
                  >
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            {articles ? (
              articles.length ? (
                <>
                  {articles.map((article) => (
                    <ArticlePreview article={article} key={article.createdAt} />
                  ))}
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
