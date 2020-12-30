<template>
    <div id="app">
        <TodoHeader></TodoHeader>
        <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
        <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem" v-on:toggleItem="toggleOneItem"></TodoList>
        <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
    </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
    data: function(){
        return {
            todoItems:[]
        }
    },
    methods:{
        addOneItem:function(todoItem){
            var obj = {completed: false, item: todoItem};
            // localStorage.setItem(this.newTodoItem, obj);
            // 그냥 obj로 넣으면 값이 [object Object]로 나와 어떤값이 들어갔는지 확인이 안된다 그렇게 때문에 아래처럼 strigify(객체를 문자화)를 시켜야한다.
            localStorage.setItem(todoItem, JSON.stringify(obj));
            this.todoItems.push(obj);
        },
        removeOneItem:function(todoItem, index){
            // todoItem만 지우면 객체전체가 선택되서 로컬스토리지에서 안지워져 동일한 값을 가진 .item으로 지워야한다.
            // console.log(todoItem)
            localStorage.removeItem(todoItem.item);
            // splice : 해당 배열을 지워 새로운 배열을 반환해줌
            this.todoItems.splice(index, 1);
        },
        toggleOneItem: function(todoItem, index){
            console.log(todoItem, index);
            // 밑에 두개는 같으나 주석달린 거는 안티패턴이라고 한다. 
            // 이벤트버스로 todoItem을 넘겨준걸 다시 올려서 값을 바꾸는것을 안티패턴이라고한다. 
            // 컴포넌트의 데이터는 해당 컴포넌트 안에서만 바꾸는것이 규칙임
            // app.vue라는 파일이 컨테이너의 성격을 가지고 있어서 아래처럼 todoitem에 접근해서 조작하는 것이 좋다. 컴포넌트간의 경계를 더 명확하게 하는것
            // todoItem.completed = !todoItem.completed;
            this.todoItems[index].completed = !this.todoItems[index].completed;
            // localstorage 데이터 갱신
            // localstorage에는 update기능이 없으므로 지우고 다시 넣어줘야한다.
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
            // localstorage부분의 todoItem은 안티패턴이 아니다. 왜냐하면 다른 곳에서 받아 변형하지 않고 그대로 쓰기 때문이다.
        },
        clearAllItems:function(){
            localStorage.clear();
            this.todoItems = [];
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
    },
    components:{
    'TodoHeader':TodoHeader,
    'TodoInput':TodoInput,
    'TodoList':TodoList,
    'TodoFooter':TodoFooter
    }
}
</script>

<style>
    body{
    text-align: center;
    background-color: #f6f6f6;
    }
    input{
    border-style: groove;
    width: 200px;
    }
    button{
    border-style: groove;
    }
    .shadow{
    box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
    }
</style>
