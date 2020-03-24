import Vue from 'vue';
import Router from 'vue-router';
import propsComponent from '../components/Props.vue';
import MovieDetails from '../components/MoviesDetails.vue';

Vue.use(Router);

let routes= [
  {
    path:'/details/:id',
    name:'details',
    component: MovieDetails
  },
  {
    path:'/',
    name:'home',
    component: propsComponent
  }
];

let router = new Router({
  mode:'history',
  base: __dirname,
  routes
});

export default router;