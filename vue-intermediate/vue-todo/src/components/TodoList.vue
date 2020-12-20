<template>
    <div>
        <ul>
            <!-- vscode 특성상 v-bind:key를 지정해주지 않으면 오류로 출력된다 -->
            <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
                <span class="checkBtn" v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplate(todoItem, index)">check</span>
                <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
                <!-- <button v-on:click="removeTodo"></button> -->
                <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">del</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            todoItems:[]
        }
    },
    methods:{
        removeTodo: function(todoItem, index) {
            // console.log(todoItem, index);
            localStorage.removeItem(todoItem);
            // splice : 해당 배열을 지워 새로운 배열을 반환해줌
            this.todoItems.splice(index, 1);
        },
        toggleComplate: function(todoItem, index) {
            console.log(todoItem, index);
            todoItem.completed = !todoItem.completed;
            // localstorage에는 update기능이 없으므로 지우고 다시 넣어줘야한다.
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
        }
    },
    created: function(){
        // console.log('created')
        if(localStorage.length > 0){
            for (var i = 0; i < localStorage.length; i++){
                console.log(localStorage.key(i));
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                    // TodoInput.vue에서 stringify로 문자화 했기때문에 다시 Json 형태로 변환해줘야한다 JSON.parse
                    // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))))
                    this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    // this.todoItems.push(localStorage.key(i));
                }
            }
        }
    }
}
</script>

<style scoped>
    ul{
        list-style: none;
        padding-left: 0;
        margin-top: 0;
        text-align: left;
    }
    li{
        display: flex;
        min-height: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0.5rem 0;
        padding: 0 0.9rem;
        background: #fff;
        border-radius: 5px;
    }
    .checkBtn{
        line-height: 45px;
        color: #63adcd;
        margin-right: 5px;
    }
    .checkBtnCompleted{
        color:#b3adad;
    }
    .textCompleted{
        text-decoration: line-through;
        color:#b3adad;
    }
    .removeBtn{
        margin-left: auto;
        color: #de4343;
    }
</style>