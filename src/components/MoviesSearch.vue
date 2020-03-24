<template>
 <div>
    <Pagination 
    ref="Pagination"
    :pageProps="page"
    :total_page="total_pages" 
    @update-page="updateNumberPage"
  >
    </Pagination>
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4 py-3"  
            v-for="(movie,key) in movies"  
            :key="key"
            v-show="movie.poster_path"
            >
            <MovieComponent
                :id="movie.id"
                :title="movie.title"
                :synopsis="movie.overview"
                :cover="movie.poster_path"
                :like="movie.like"
                @addFavorite="onToggleLike"
            ></MovieComponent>
        </div>
    </div>
    <MovieFav :show.sync="showFav"></MovieFav>
</div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import MovieComponent from './Movie.vue';
import Pagination from './Pagination.vue';
import MovieFav from './MovieFav.vue';

  let MoviesSearch = Vue.component('moviesSearch',{
      props:{
          movies:{},
          page:null,
          total_pages:null,
          isSearch:{
              default: false
          }
      },
      data(){
          return{
              showFav:false
          }
      },
      methods: {
          updateNumberPage(event){
            this.isSearch?this.searchPageChange(event): this.moviesPageChange(event);            
          },
          onToggleLike(data){
            let movieLike = this.movies.find(movie => movie.id == data.id);
            movieLike.like = data.like;
            this.toogleFavMovies(movieLike);
            this.showFav= data.like;
        },
          ...Vuex.mapMutations(['moviesPageChange']),
          ...Vuex.mapMutations(['searchPageChange']),
          ...Vuex.mapMutations(['toogleFavMovies']),
      },
      components:{
          MovieComponent,
          Pagination,
          MovieFav
      }
  });

  export default MoviesSearch;
</script>