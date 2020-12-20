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
                var obj = {completed: false, item: this.newTodoItem};
                console.log(this.newTodoItem);
                // localStorage.setItem(this.newTodoItem, obj);
                // 그냥 obj로 넣으면 값이 [object Object]로 나와 어떤값이 들어갔는지 확인이 안된다 그렇게 때문에 아래처럼 strigify(객체를 문자화)를 시켜야한다.
                localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
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