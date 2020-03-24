<template>
    <div v-if="cover" class="card movie-box" :id="id | formatId" :class="{'movie-like':isFav}">
        <img :src="cover | coverURL" class="card-img-top">
        <div class="card-body">
            <h2 class="card-title">{{title | upperCaseTitle}}</h2>
            <p class="card-text" v-text="synopsis"></p>
            <button class="btn fav-footer" :class="btnStatus" @click="toogleLike">
                <!--<span v-text="!isFav ? 'Añadir a favoritos ':'Favorito '"></span>-->
                <i class="fa-heart" :class="{'far':!isFav,'fas':isFav}"></i>
            </button>
            <router-link :to="{name:'details', params:{id}}" class="btn btn-primary details-footer">Details</router-link>
        </div>
    </div>
</template>

<script>
    let MovieComponent= {
        props:{
            id:{
                type:Number,
                required:true
            },
            title:{
                type:String,
                required:true
            },
            synopsis:{
                type:String,
                required:false,
                default:"Doesn't have synopsis"
            },
            cover:{
                type:String,
            },
            like:{
                type:Boolean,
                required:true,
                default(){
                    return false;
                }
            }
        },
        methods:{
            toogleLike(){
                let data={
                    id:this.id,
                    like:!this.isFav,
                }

                this.$emit('addFavorite',data)
            }
        },
        computed:{
            btnStatus(){
                return this.isFav?'btn-like':'btn-light'
            },
            isFav(){
                let favMovies= this.$store.state.favMovies;
                let index = favMovies.findIndex(movie=>movie.id == this.id);
                return index >= 0;
            }
        },
        filters:{
            formatId(value){
                return `movieCard-${value}`;
            },
            upperCaseTitle(value){
                return value.toUpperCase();
            },
            truncateSynopsis(value){
                return value.substring(1,150);
            }
        }
    }
    export default MovieComponent;
</script>

<style>
.btn.btn-like{
    border-color: #ef5777;
    color: #ef5777;
}
.movie-like{
    box-shadow: 0 0 0 4px #ef5777;
}
.movie-box{
  height: 100%;
  overflow: hidden; 
  position:relative;
}
.fav-footer{
    position: absolute;
    bottom: 2%;
    left: 10%;
}
.details-footer{
    position: absolute;
    bottom: 2%;
    left: 67%;
}
p{
    text-align: justify;
    padding-bottom: 12%;
}
</style>