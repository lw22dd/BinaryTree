<template>
    <div class="left-list">
        <el-scrollbar class="left-form">
            <div v-for="([key, item], index) in [...fatherMap]" :key="index" class="scrollbar-demo-item" @click="setOrderData(key,item)">
                <div class="left-item" >{{ index+1 }}</div>
                <div class="traversal">
                    <div class="traversal-item">前序遍历：{{ key }}</div>
                    <div class="traversal-item">中序遍历：{{ item }}</div>
                </div>
            </div>
        </el-scrollbar>
        <div class="choose-input">
            <div class="input-group pre-order">
                <label for="preOrder">前序遍历</label>
                <el-input id="preOrder"  v-model="orderData.preOrder" placeholder="请输入前序遍历" />
            </div>
            <div class="input-group in-order">
                <label for="inOrder">中序遍历</label>
                <el-input id="inOrder"  v-model="orderData.inOrder" placeholder="请输入中序遍历" />
            </div>
            <el-button class="btn btn-primary" @click="$emit('submit', orderData)">确定</el-button>
        </div>
    </div>

</template>

<style>
.left-list {
    width: 400px;
    height: 100%;
    background-color: #fff;
    float: left;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
}
.left-form {
    flex: 1;
    height: 10%; /* calc(100% - 50px) */
}
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 10px;
    height: 80px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
.left-item {
    width: 20px;
}
.traversal {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.traversal-item {
    margin-bottom: 5px; /* 调整间距 */
}
.input-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    height: 40px;
}
.input-group label {
    margin-right: 10px;
}
.input-group .el-input {
    width: 240px;
    height: 100%;
}
.choose-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 20%;
    
}

</style>
<script setup>
import { ref, reactive, watch } from 'vue'
import { defineProps } from 'vue';

const props = defineProps({ // 接收父组件传值，传入前序遍历和中序遍历
    fatherMap: Map
})
const preOrder = ref('')
const inOrder = ref('')


const orderData = reactive({
    preOrder: '',
    inOrder: ''
})

const setOrderData = function(key,item){
    this.orderData.preOrder = key;
    this.orderData.inOrder = item;
}

import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
</script>

