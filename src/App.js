import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useFetch from './hooks/useFetch';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import { getApiComfiguration, getGenres } from './store/homeSlice';
import getData from './api';


function App() {
    const dispatch = useDispatch();
    const [data] = useFetch('/configuration');

    useEffect(() => {
        const url = {
            backdrop: data?.images?.secure_base_url + 'original',
            poster: data?.images?.secure_base_url + 'original',
            profile: data?.images?.secure_base_url + 'original'
        }
        dispatch(getApiComfiguration(url));

        genresCall();
    }, [data])

    const genresCall = async () => {
        let promises = [];
        let endPoints = ['tv', 'movie'];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(getData(`/genre/${url}/list`));
        })

        const data = await Promise.all(promises);
        data.map(({genres}) => {
            return genres.map((item) => (allGenres[item.id] = item))
        })
        dispatch(getGenres(allGenres));
    }

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:mediaType/:id' element={<Details />} />
                <Route path='/search/:query' element={<SearchResult />} />
                <Route path='/explore/:mediaType' element={<Explore />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App