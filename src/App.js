import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./Components/MovieRow";
import './App.css';
import FeaturedMovie from "./Components/FeaturedMovie";
import Header from "./Components/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
    
  useEffect(()=>{
     const loadAll = async () => {
      //pegar a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegar o Featured
      let originals = list.filter(i=>i.slug='originals');
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results?.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      
      setFeaturedData(chosenInfo);

     }

     loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scrol', scrollListener);
    }

  }, []);
  
  return(
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Clone da tela inicial do Netflix seguindo as orientações do <a href="https://www.youtube.com/@bonieky">Bonieky Lacerda.</a> <br/>
        Todos os dados foram fornecidos pelo <a href="https://www.themoviedb.org/?language=pt-BR">The Movie Database.</a> <br/>
        Feito por Giovanna Oliveira.
      </footer>

    </div> 
  );
}
