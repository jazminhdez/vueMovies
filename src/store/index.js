import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
    state:{
      favMovies:[],
      moviesPage:1,
      searchPage:1
    },
    mutations:{
      toogleFavMovies(state,movie){
        let index = state.favMovies.findIndex(favMovie => favMovie.id == movie.id );
        if(index>=0){
          state.favMovies.splice(index,1);
          return;
        }
        state.favMovies.push(movie);
      },
      moviesPageChange(state,page){
        state.moviesPage=page;
      },
      searchPageChange(state,page){
        state.searchPage=page;
      }
    }
});

export default store;