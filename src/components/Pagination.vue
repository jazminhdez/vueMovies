<template>
    <nav class="navbar bg-faded">
        <div class="container">
            <ul class="pagination nav navbar-logo mx-auto">
                <li class="page-item nav-item"
                    @click="beforePage()"
                    v-if="(indexPage-itemPerPage)>=0">
                <a class="page-link nav-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item nav-item" v-for="(n,index) in viewItemPerPage" :key="index"
                    @click="searchPage(n,index)"
                    :class="{
                    'active': n != indexSelected+1, 
                    'active': n == indexSelected+1
                    }"
                >
                    <a class="page-link nav-link" href="#" v-text="indexPage==0?n:indexPage+n-1"></a>
                </li>

                <li class="page-item nav-item"
                    @click="nextPage()"
                    v-if="viewItemPerPage>=itemPerPage && (indexPage+viewItemPerPage)<=total_page">
                <a class="page-link nav-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    name:'Pagination',
    props:{
        pageProps:{
            type:Number,
            default:1
        },
        total_page:{
            default:null
        } 
    },

    beforeUpdate(){
        if(this.total_page<this.itemPerPage)
        {
            this.viewItemPerPage= this.total_page;
        }
    },
    data(){
        return{
            indexPage:0,
            indexSelected:this.pageProps-1,
            itemPerPage:17,
            viewItemPerPage:17,
            page:this.pageProps,
        }
    },
    watch:{
        page(value){
            this.$emit('update:page',value)
        },
        total_page:function(newValue){
            if(newValue >= this.itemPerPage){
                this.viewItemPerPage= this.itemPerPage;
            }
        }
    },
    methods: {
        searchPage(value,index){
            this.indexSelected=index;
            if(this.page>=this.itemPerPage){
                if(this.page-this.indexPage==0){
                    this.page=this.page+(value-1);
                }
                else
                {  
                    if(this.page == this.itemPerPage)
                    {
                        this.page=value;
                    }
                    else
                    {
                        this.page=this.page-(this.page-this.indexPage)+index;
                    }
                    
                }
                
            }
            else
            {
                this.page=value;
            }
               // this.getPopularMovies();
            this.$emit('update-page',this.page);
        },
        beforePage(){
            this.viewItemPerPage=this.itemPerPage;
            this.indexSelected=this.itemPerPage-1;
            this.page= this.indexPage;
            this.indexPage-=this.itemPerPage;
            //this.getPopularMovies();
            this.$emit('update-page',this.page);
        },
        nextPage(){
            this.indexSelected=0;
            this.indexPage+=this.itemPerPage;
            if(this.indexPage+this.itemPerPage>this.total_page)
            {
                this.viewItemPerPage= this.itemPerPage-(((this.indexPage+this.itemPerPage)-1)-this.total_page);
            }
            this.page= this.indexPage;
           // this.getPopularMovies();
            this.$emit('update-page',this.page);
        }
    },
}
</script>
<style scoped>
nav{
    width:100%;
}
</style>