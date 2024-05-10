import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


function Carousel({ data, loading, mediaType, title }) {
  const carouselContainer = useRef();
  const { url } = useSelector(state => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrolAmount = dir === 'left' ? (
      container.scrollLeft - (container.offsetWidth + 20)
    ) : (
      container.scrollLeft + (container.offsetWidth + 20)
    );
    container.scrollTo({
      left: scrolAmount,
      behavior: 'smooth'
    })
  }

  const skItem = () => {
    return (
      <div className="skeleton-item">
        <div className="poster-block">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carousel-title">{title}</div>}

        <BsFillArrowLeftCircleFill
          className="carousel-left-nav arrow"
          onClick={() => navigation('left')}
        />
        <BsFillArrowRightCircleFill
          className="carousel-right-nav arrow"
          onClick={() => navigation('right')}
        />

        {!loading ? (
          <div ref={carouselContainer} className="carousel-items">
            {data?.map((item) => {

              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;

              return (
                <div
                  key={item.id}
                  className="carousel-item"
                  onClick={() => navigate(`/${item.media_type || mediaType}/${item.id}`)}
                >
                  <div className="poster-block">
                    <Img src={posterUrl}/>
                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="text-block">
                    <span className="title">
                      {item.title || item.name}
                    </span>
                    <span className="date">
                      {dayjs(item.release_date).format('MMM D, YYYY')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="loading-skeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel