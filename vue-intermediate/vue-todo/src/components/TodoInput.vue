<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <!-- <button v-on:click="addTodo">add</button> -->
        <span class="addContainer">
            +
        </span>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            newTodoItem: ""
        }
    },
    methods:{
        addTodo: function() {
            if(this.newTodoItem !== ''){
                // this.$emit('이벤트이름','인자1','인자2','인자3',....);
                // 이벤트이름은 app.vue template에 있음
                this.$emit('addTodoItem', this.newTodoItem);
                this.clearInput();
            }
        },
        clearInput:function(){
            this.newTodoItem = '';
        }
    }
}
</script>

<style scoped>
    input:focus{
        outline:none;
    }
    .inputBox{
        background: #fff;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
    }
    .inputBox input{
        border-style: none;
        font-size: 0.9rem;
    }
    .addContainer{
        float:right;
        background: #add;
        display:block;
        width: 3rem;
        height: 100%;
        border-radius: 0 5px 5px 0;
    }
    .addBtn{
        color:#fff;
        vertical-align: middle;
    }
</style>