<template>
    <div>
        <span>{{ props.orderData }}</span>
        <button @click="handleClick">click</button>
    </div>
    <div style="padding-left: 200px;">
        <div class="tree">
            <div v-for="(level, index) in treeLevels" :key="index" class="level"
                style="display: flex; justify-content: space-around; width: 50%;">
                <div v-for="(node, nodeIndex) in Math.pow(2, index)" :key="nodeIndex"
                    :class="['tree-node', { 'highlight': isHighlighted((Math.pow(2, index) - 1) + nodeIndex + 1) }]"
                    :id="(Math.pow(2, index) - 1) + nodeIndex + 1" style="background-color: #ecf5ff;">
                    <div>{{ setNodeValueById((Math.pow(2, index) - 1) + nodeIndex + 1) }}</div> <!-- ID 计算 -->
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 20px;">
            <button @click="highlightTraversal('preorder')">前序遍历</button>
            <button @click="highlightTraversal('inorder')">中序遍历</button>
            <button @click="highlightTraversal('postorder')">后序遍历</button>
            <button @click="highlightTraversal('levelorder')">层序遍历</button>
            <button @click="highlightTraversal('OrderThreading')">中序线索</button>

        </div>
    </div>
</template>

<script setup>
import { watch, ref, toRefs } from 'vue';
import BinaryTreeClass from '../utils/BuildTree';
import { TreeNode } from '../model/TreeNode';
import inThreading from '../utils/inThreading';
import _ from 'lodash';

const props = defineProps({
    orderData: Object
});
const nodeID = ref(0);

// 使用 toRefs 将 orderData 变为响应式引用
const { orderData } = toRefs(props);
const treeLevels = ref([]);
const treeData = ref(null);
const highlightedNodes = ref([]);
const levelOrderMap = ref(new Map());
const ThreadingTree = ref([]);
// 监视 orderData 的变化，深度监听
watch(orderData, (newValue) => {
    console.log('orderData 变化:', newValue);
    if (newValue.preOrder && newValue.inOrder) {
        nodeID.value = 1; // 重置节点id
        // 直接将 preOrder 和 inOrder 按空格分割，不再只处理数字
        const preorderArray = newValue.preOrder.split(' ')
            .filter(item => item.trim() !== ''); // 清除空格并过滤空项

        const inorderArray = newValue.inOrder.split(' ')
            .filter(item => item.trim() !== ''); // 同上

        // 构建二叉树
        treeData.value = BinaryTreeClass.buildTree(preorderArray, inorderArray);
        levelOrderMap.value = BinaryTreeClass.levelOrderBuildMap(treeData.value); // 根据先序和中序遍历结果生成层序遍历结果的id与值映射表
        
        // 深度复制 treeData
        const copiedTreeData = _.cloneDeep(treeData.value);
        ThreadingTree.value = inThreading.inOrderThreading(copiedTreeData);// 对复制的数据进行线索化
        // 返回层序遍历结果
        const levelOrderResult = () => {
            const result = [];
            levelOrderMap.value.forEach((value, key) => {
                result.push(value);
            });
            return result;
        };

        treeLevels.value = buildLevels(levelOrderResult());
        console.log('树结构已更新:', treeData.value); // 调试打印

        const allNodes = document.querySelectorAll('.tree-node');
        allNodes.forEach(node => {
                node.style.backgroundColor = '#ecf5ff';
        });
    }

}, { immediate: true, deep: true });

const setNodeValueById = (id) => {
    const node = levelOrderMap.value.get(id); // 获取 map 中的值
    if (node) {
        return node; // 返回值而非 node.value，假设这里 `node` 本身就是你想要的值
    }
    return null;
};

// 点击事件，输出树结构和层序遍历结果
const handleClick = () => {
    if (treeData.value) {
        console.log('树结构:', treeData.value);
        console.log("线索化树结构:", ThreadingTree.value)
        // 输出层序遍历结果
        console.log('层序遍历结果:');
        levelOrderMap.value.forEach((value, key) => {
            console.log(key + ': ' + value);
        });
        const preOrderTraversalResult = BinaryTreeClass.preOrderTraversal(treeData.value);
        console.log('前序遍历结果:');
        preOrderTraversalResult.forEach(node => {
            console.log(node.id + ': ' + node.value);
        });
        console.log('Map:', levelOrderMap.value);
    } else {
        console.log('树结构尚未构建，无法进行层序遍历。');
    }
};

// 通过层序遍历生成树的层次
function buildLevels(nodes) {
    const levels = [];
    let level = 0;
    let levelNodes = [];
    let currentLevelSize = 1;

    nodes.forEach((node, index) => {
        if (index === currentLevelSize) {
            levels.push(levelNodes);
            levelNodes = [];
            currentLevelSize = Math.pow(2, level++) + index;
        }
        levelNodes.push(node);
    });

    levels.push(levelNodes); // 最后一层
    return levels;
}

// 高亮显示指定遍历结果
const highlightTraversal = (type) => {
    let traversalNodes = [];

    switch (type) {
        case 'preorder':
            traversalNodes = BinaryTreeClass.preOrderTraversal(treeData.value);
            break;
        case 'inorder':
            traversalNodes = BinaryTreeClass.inOrderTraversal(treeData.value);
            break;
        case 'postorder':
            traversalNodes = BinaryTreeClass.postOrderTraversal(treeData.value);
            break;
        case 'levelorder':
            traversalNodes = BinaryTreeClass.levelOrderTraversal(treeData.value);
            break;
        case 'OrderThreading':
            traversalNodes = inThreading.inOrderTraversalWithThreads(ThreadingTree.value);
            break;
    }

    highlightedNodes.value = traversalNodes.map(node => node.id);

    console.log('高亮节点:', highlightedNodes.value);

    // 高亮节点
    highlightedNodes.value.forEach((id, index) => {
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            element.style.backgroundColor = 'rgb(158, 158, 252)';
        }
    }, index * 500); // 每个节点高亮间隔500毫秒
});

    // 恢复其他节点的颜色
    const allNodes = document.querySelectorAll('.tree-node');
    allNodes.forEach(node => {
            node.style.backgroundColor = '#ecf5ff';
    });
};

const isHighlighted = (id) => {
    return highlightedNodes.value.includes(id);
};
</script>

<style scoped>
.tree {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tree-node {
    display: inline-block;
    padding: 10px;
    margin: 10px;
    border-radius: 50%;
    background-color: #f0f0f0;
    text-align: center;
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    transition: background-color 0.3s;
}

.highlight {
    background-color: rgb(158, 158, 252);
    color: rgb(0, 0, 0);
}

.level {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>