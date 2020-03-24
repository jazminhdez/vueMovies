<template>
    <div>
        <form @submit.prevent="search" class="form-inline md-form form-sm mt-0">
            <div class="input-group md-form form-sm form-2 pl-0 w-100">
                <div v-show="query" @click="resetSearch" class="input-group-append">
                    <span class="btn btn-danger">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
                <input class="form-control my-0 py-1 green-border"
                 type="text"
                 placeholder="Buscar"
                 aria-label="Buscar"
                 v-model="query"
                >
                <div class="input-group-append">
                    <button class="input-group-text green">
                        <i class="fas fa-search text-grey"
                        aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>

  let SearchBar = {
        data(){
            return{
                query: '',
               // page:1
            }
        },
        methods: {
            search(){
                let URL = `${this.apiBaseURL}search/movie${this.apiConfig}&query=${this.query}&page=${this.$store.state.searchPage}`;
               fetch(URL)
                .then(response => response.json())
                .then(data=>{
                    this.$store.state.searchPage=data.page;
                    this.$emit('input',data);
                });
            },
             searchPage(value){
                this.$store.state.searchPage=value;
                //this.page=value;
                this.search();
            },
            resetSearch(){
                this.query='';
                this.$store.state.searchPage=1;
                this.$emit('input',{});
            },
        },
    };

    export default SearchBar;
</script>
<style>
    .input-group.md-form.form-sm.form-2 input.green-border{
        border: 1px solid #3BA877;
    }
    .input-group-text.green{
        background-color: #3BA877;
        color: #fff;
        border: 1px solid #3BA877;
    }
</style>