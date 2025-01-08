<template>
    <div class="left">
        <LeftForm :fatherMap="map" @submit="submit" />
        
    </div>
    <button @click="test">点我发送请求给java</button>
    <Tree :orderData="TreeOrderData"  />
</template>
<style lang="scss">
.left {
    position: absolute;
    height: calc(100% - 30px);
    left: 0;

}
</style>

<script lang="ts" setup>
import { useRoute, useRouter, RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { ref, onMounted, Ref,reactive,watch } from 'vue'
import Service from '../utils/axios'
import LeftForm from '../components/LeftForm.vue'
import Tree from '../components/Tree.vue' 

const isCollapse: Ref<boolean> = ref(false)
const activeIndex: Ref<string> = ref('1')
const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()
function test() {
    console.log("test");
    Service.get('/api/test', {});
}
onMounted(async () => {
    await router.isReady();
    /*
    if (new RegExp('welcome').test(route.path)) {
        activeIndex.value = '1'
    } else if (new RegExp('user').test(route.path)) {
        activeIndex.value = '2'
    } else if (new RegExp('table').test(route.path)) {
        activeIndex.value = '3'
    }*/

});
// 定义二叉树的映射关系，这里是整个项目的数据集
const map = new Map([
    ['3 9 20 15 7', '9 3 15 20 7'],
    ['A B D C E', 'D B A C E'],
    ['A B C', 'B A C'],
    ['X Y Z', 'Y X Z'],
    ['M N O P', 'N M O P'],
    ['1 2 3 4', '2 1 4 3'],
    ['A B C D E F', 'B A D E C F'],
    ['K L M N O', 'M L O N K'],
    ['P Q R S', 'Q P S R'],
    ['S T U', 'T S U'],
    ['G H I', 'H G I'],
    ['A B C D E F G', 'C B D A F E G'],
    ['T U V W', 'U T W V'],
    ['1 2 3', '2 3 1'],
    ['A B C', 'C B A']
]);
const TreeOrderData = reactive({
    preOrder: '',
    inOrder: ''
})


const submit = (orderData: any ) => {
    TreeOrderData.preOrder = orderData.preOrder; // 更新 preOrder
    TreeOrderData.inOrder = orderData.inOrder;   // 更新 inOrder
}
/*
watch(TreeOrderData, (newValue) => {
     console.log('orderData changed:', newValue);
});*/
</script>