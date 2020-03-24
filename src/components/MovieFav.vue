<template>
    <div v-show="show" class="movieFav-wrapper">
        <div :id="'fav-'+uid" class="movieFav">
        </div>
    </div>
</template>

<script>
    let MovieFav = {
        props:{
            show: {
                type:Boolean,
                default: function(){
                    return false;
                }
            }
        },
        data(){
            return{
                uid: null
            }
        },
        beforeMount(){
             this.uid= this._uid;
        },
        mounted() {
            let $element = document.getElementById(`fav-${this.uid}`);
            $element.addEventListener('animationend',() => {
               this.$emit('update:show',false);
            });
        },
    }
    export default MovieFav;
</script>

<style>
.movieFav-wrapper{
    background: #fff;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}
.movieFav {
    position: relative;
    width: 100px;
    height: 90px;
    animation: heartbeat 1s forwards;
    margin:0 auto
}
.movieFav:before,
.movieFav:after {
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: rgb(246, 71, 71);
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 50px 50px 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
        -ms-transform-origin: 0 100%;
        -o-transform-origin: 0 100%;
            transform-origin: 0 100%;
}
.movieFav:after {
    left: 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
            transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
        -ms-transform-origin: 100% 100%;
        -o-transform-origin: 100% 100%;
            transform-origin :100% 100%;
}
@keyframes heartbeat
{
    0%
    {
        transform: scale( .5 );
        opacity: 1;
    }
    50% {
        transform: scale( 1.2 );
        opacity: 1;
    }
    100%
    {
        transform: scale( 1.5 );
        opacity: 0;
    }
}
</style>