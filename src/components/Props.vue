<template>
    <div class="container">
        <SearchBar ref="SearchMovie" v-model="searchMovies"></SearchBar>
        <div v-show="!Object.keys(searchMovies).length">
            <MoviesSearch v-if="movies" 
            :movies="movies"
            :page="getPage"
            :total_pages="total_page" 
            ></MoviesSearch>
        </div>
        <div v-show="Object.keys(searchMovies).length">
             <!--<MoviesSearch :movies="searchMovies"></MoviesSearch>-->
           <h1>Search Results</h1>
            <MoviesSearch v-if="searchMovies" 
            :movies="searchMovies.results"
            :page="getSearchPage"
            :total_pages="searchMovies.total_pages" 
            :isSearch="true"
            ></MoviesSearch>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import SearchBar from './SearchBar.vue'
    import MoviesSearch from './MoviesSearch.vue';

    let propsComponent = Vue.component('props-component',{
        data(){
            return{
                movies:[],
                total_page:null,
                showFav: false,
                searchMovies:{}
            }
        },
        components:{
            SearchBar,
            MoviesSearch
        },
        mounted() {
           this.getPopularMovies();
        },
        watch:{
            getPage(){
                this.getPopularMovies();
            },
            getSearchPage(){
                this.$refs.SearchMovie.search();
            }
        },
        computed:{
            getPage(){
                return this.$store.state.moviesPage;
            },
            getSearchPage(){
                return this.$store.state.searchPage;
            }
        },
        methods: {
            getPopularMovies(){
                const URL = `${this.apiBaseURL}discover/movie${this.apiConfig}&sort_by=popularity.desc&page=${this.$store.state.moviesPage}`
               fetch(URL)
                .then(response => response.json())
                .then(data => {
                    
                    this.$store.state.moviesPage=data.page;
                    this.total_page= data.total_pages;
                    this.movies= data.results.map(m =>{
                        m.like= false;
                        return m;
                    });
                })
            }
        },
    })
    export default propsComponent;
</script>
