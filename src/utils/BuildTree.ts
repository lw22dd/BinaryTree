import { TreeNode } from '../model/TreeNode';

class BinaryTree {
    


    // 根据前序和中序遍历构建二叉树
    public static buildTree(preorderArray: any[], inorderArray: any[]): TreeNode | null {
        if (preorderArray.length === 0 || inorderArray.length === 0) {
            return null;
        }

        const rootValue = preorderArray[0]; // 在前序遍历找到树根
        const root = new TreeNode(rootValue); // 建立根节点

        // 找到根节点在中序遍历中的索引
        const rootIndex = inorderArray.indexOf(rootValue);

        // 检查根节点是否存在于中序数组中
        if (rootIndex === -1) {
            console.error(`根节点 ${rootValue} 未在中序遍历中找到.`);
            return null; // 如果根节点不在中序数组中，返回 null
        }

        // 计算左子树的节点数量
        const leftSize = rootIndex; // 左子树节点的个数

        // 递归构建左子树和右子树
        root.left = this.buildTree(
            preorderArray.slice(1, 1 + leftSize), // 前序遍历中左子树部分
            inorderArray.slice(0, leftSize) // 中序遍历中左子树部分
        );

        root.right = this.buildTree(
            preorderArray.slice(1 + leftSize), // 前序遍历中右子树部分
            inorderArray.slice(leftSize + 1) // 中序遍历中右子树部分
        );

        return root;
    }

    // 层序遍历构建Map方法，返回 Map<number, number | null> 类型，key 为结点 ID，value 为结点值
public static levelOrderBuildMap(root: TreeNode | null): Map<number, number | null> {
    if (!root) return new Map();

    const result: Map<number, number | null> = new Map();
    const queue: { node: TreeNode; id: number }[] = [{ node: root, id: 1 }]; // 从1开始分配ID

    while (queue.length > 0) {
        const { node: currentNode, id } = queue.shift()!;

        // 将当前节点的ID和值存入结果
        result.set(id, currentNode.value);
        currentNode.id = id;

        // 计算左右子节点的ID
        const leftId = id * 2;     // 左子节点ID
        const rightId = id * 2 + 1; // 右子节点ID

        if (currentNode.left) {
            queue.push({ node: currentNode.left, id: leftId });
        }

        if (currentNode.right) {
            queue.push({ node: currentNode.right, id: rightId });
        }
    }

    return result;
}





    // 前序遍历
    public static preOrderTraversal(root: TreeNode | null): TreeNode[] {
        const result: TreeNode[] = [];

        const traverse = (node: TreeNode | null): void => {
            if (!node) return;
            result.push(node); // 访问根节点
            traverse(node.left); // 访问左子树
            traverse(node.right); // 访问右子树
        };

        traverse(root);
        return result;
    }

    // 中序遍历
    public static inOrderTraversal(root: TreeNode | null): TreeNode[] {
        const result: TreeNode[] = [];

        const traverse = (node: TreeNode | null): void => {
            if (!node) return;
            traverse(node.left); // 访问左子树
            result.push(node); // 访问根节点
            traverse(node.right); // 访问右子树
        };

        traverse(root);
        return result;
    }

    // 后序遍历
    public static postOrderTraversal(root: TreeNode | null): TreeNode[] {
        const result: TreeNode[] = [];

        const traverse = (node: TreeNode | null): void => {
            if (!node) return;
            traverse(node.left); // 访问左子树
            traverse(node.right); // 访问右子树
            result.push(node); // 访问根节点
        };

        traverse(root);
        return result;
    }
    
    // 层序遍历
    public static levelOrderTraversal(root: TreeNode | null): TreeNode[] {
    const result: TreeNode[] = [];
    const queue: TreeNode[] = [];

    if (root) queue.push(root);

    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        result.push(currentNode); // 访问当前节点

        // 将左子节点加入队列
        if (currentNode.left) {
            queue.push(currentNode.left);
        }

        // 将右子节点加入队列
        if (currentNode.right) {
            queue.push(currentNode.right);
        }
    }

    return result;
}

// 前序遍历（非递归）
public static preOrderTraversalIterative(root: TreeNode | null): TreeNode[] {
    const result: TreeNode[] = [];
    const stack: TreeNode[] = [];
    if (root) stack.push(root);

    while (stack.length > 0) {
        const node = stack.pop()!;
        result.push(node); // 访问根节点
        if (node.right) stack.push(node.right); // 先入栈右子树
        if (node.left) stack.push(node.left); // 后入栈左子树
    }

    return result;
}

// 中序遍历（非递归）
public static inOrderTraversalIterative(root: TreeNode | null): TreeNode[] {
    const result: TreeNode[] = [];
    const stack: TreeNode[] = [];
    let current: TreeNode | null = root;

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left; // 先访问左子树
        }
        current = stack.pop()!;
        result.push(current); // 访问根节点
        current = current.right; // 再访问右子树
    }

    return result;
}

// 后序遍历（非递归）
public static postOrderTraversalIterative(root: TreeNode | null): TreeNode[] {
    const result: TreeNode[] = [];
    const stack: TreeNode[] = [];
    let lastVisitedNode: TreeNode | null = null;
    let current: TreeNode | null = root;

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left; // 先访问左子树
        }
        const peekNode = stack[stack.length - 1];
        if (peekNode.right && peekNode.right !== lastVisitedNode) {
            current = peekNode.right; // 优先访问右子树
        } else {
            stack.pop();
            result.push(peekNode); // 访问根节点
            lastVisitedNode = peekNode;
        }
    }

    return result;
}
// 层序遍历（递归）
public static levelOrderTraversalRecursive(root: TreeNode | null): TreeNode[][] {
    const result: TreeNode[][] = [];

    const traverse = (node: TreeNode | null, level: number): void => {
        if (!node) return;
        
        // 如果结果数组的长度等于当前层数，表示需要新增一层
        if (result.length === level) {
            result.push([]);
        }

        // 将当前节点添加到对应层级的数组中
        result[level].push(node);
        
        // 递归访问左子树和右子树
        traverse(node.left, level + 1);
        traverse(node.right, level + 1);
    };
    
    traverse(root, 0);
    return result;
}

}

export default BinaryTree;
