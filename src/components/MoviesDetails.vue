<template>
    <div  v-if="Object.keys(movie).length" class="heroMovie text-white py-5" :style="{
        'background':'linear-gradient(rgba(59,168,119,0.45),rgba(59,168,119,1)),url(https://image.tmdb.org/t/p/w1400_and_h450_face'+movie.backdrop_path+')',
        'background-size':'cover',
    }">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12 col-md-6 col-lg-4">
                    <img :src="movie.poster_path | coverURL" class="w-100"/>
                </div>
                <div class="col-12 col-md-7 col-lg-8">
                    <h2><b>{{movie.title}}</b></h2>
                    <p v-text="movie.overview"/> 
                    <div class="row generes">
                        <div class="col-12 ">
                         <h6><b>Géneros: </b>
                         <span  v-for="(genre,key) in movie.genres" :key="key">
                            {{genre.name}}
                         </span>
                         </h6>
                        </div>
                    </div> 
                    <div class="row align-items-center ">
                        <div class="col-12 col-md-6 col-lg-4">
                           <h6><b>Estreno</b><br>{{movie.release_date | dateFormat}}</h6>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <h6><b>Duración</b><br>{{movie.runtime}} minutos</h6>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <h6><b>Popularidad</b><br>{{movie.popularity}}</h6>
                        </div>    
                    </div>
                  
                    <div class="row align-items-center">
                        <div class="col-2" v-for="(production,key) in movie.production_companies" 
                        :key="key" 
                        v-show="production.logo_path"
                        >
                            <img :src="production.logo_path | coverURL" class="production-company"/>
                        </div>
                    </div>
                </div>
            </div>
    
           
        </div>
    </div>
</template>

<script>
    let MovieDetails ={
        data(){
            return{
                movie:{}
            }
        },
        methods: {
            getMovie(){
                let URL = `${this.apiBaseURL}movie/${this.$route.params.id}${this.apiConfig}`;
                fetch(URL)
                .then(response => response.json())
                .then(data=>{
                    this.movie=data;
                });
            }
        },
        mounted() {
                 
            this.getMovie();
        },
     
    };
    export default MovieDetails;
</script>
<style scoped>
    .generes{
        margin-bottom: 8%;
    }
 
    .production-company{
        width: 40%;
        margin-left: 150%;
        margin-top: 25%;
    }
    img{
        padding-bottom: 40%;
    }
</style>