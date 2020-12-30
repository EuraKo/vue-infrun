<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <!-- <button v-on:click="addTodo">add</button> -->
        <span class="addContainer" v-on:click="addTodo">
            +
        </span>
        <!-- use the modal component, pass in the prop -->
        <Modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">경고! <span class="cloaseModalBtn" @click="showModal = false">x</span></h3>
            <div slot="body">입력하세요</div>
            <footer slot="footer">copy right</footer>
        </Modal>
    </div>
</template>

<script>
import Modal from './common/Modal.vue'

export default {
    data: function() {
        return {
            newTodoItem: "",
            showModal: false
        }
    },
    methods:{
        addTodo: function() {
            if(this.newTodoItem !== ''){
                // this.$emit('이벤트이름','인자1','인자2','인자3',....);
                // 이벤트이름은 app.vue template에 있음
                this.$emit('addTodoItem', this.newTodoItem);
                this.clearInput();
            } else {
                this.showModal = !this.showModal;
            }
        },
        clearInput:function(){
            this.newTodoItem = '';
        }
    },
    components: {
        Modal : Modal
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
    .cloaseModalBtn {
        color:#42b983;
    }
</style>