import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import moment from 'moment';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const APIKEY='9d15046d1d704556cc8f1d29e3ad371f';
const BASEURL = 'https://api.themoviedb.org/3/';

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return{
      apiConfig:`?api_key=${APIKEY}&language=es-MX`,
      apiBaseURL: BASEURL
    }
  },
  filters:{
    coverURL(str){
        if(str){
            return `https://image.tmdb.org/t/p/w185_and_h278_bestv2${str}`;
        }
    },
    dateFormat(str){
      moment.locale('es');
      return moment(str).format('D MMMM YYYY');
    }
  }
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

