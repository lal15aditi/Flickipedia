import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function HeroBanner() {
  const { url } = useSelector(state => state.home)
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const [data, loading] = useFetch('/movie/upcoming');

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop])

  const searchQueryHandler = (event) => {
    if(event.key === "Enter" && query){
      navigate(`/search/${query}`);
    }
  }

  return (
    <div className="hero-banner">
      {
        !loading && <div className="backdrop-img">
          <Img src={background} />
        </div>
      }

      <div className="opacity-layer"></div>
      
      <ContentWrapper>
        <div className="hero-banner-content">
          <span className="title">Welcome.</span>

          <span className="subtitle">
            Millions of movies, TV shows and people to discover.
            Explore now.
          </span>

          <div className="search-input">
            <input 
              type="text"
              placeholder='Search for movie or tv show...'
              onKeyUp={searchQueryHandler}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
      
    </div>
  )
}

export default HeroBanner;