class TreeNode {
    value: any;
    left: TreeNode | null;
    right: TreeNode | null;
    isLeftThread: boolean;
    isRightThread: boolean;

    constructor(value: any) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.isLeftThread = false;
        this.isRightThread = false;
    }
}

class inThreading {

    // 中序线索化
    public static inOrderThreading(root: TreeNode | null): TreeNode | null {
        if (!root) return null;

        const stack: TreeNode[] = []; // 使用数组模拟栈
        let current: TreeNode | null = root;
        let prev: TreeNode | null = null; 

        while (current !== null || stack.length > 0) {
            if (current !== null) {
                stack.push(current);
                current = current.left;
            } else {
                current = stack.pop()!;
                if (current !== null && current.left === null) { // 添加对 current 的检查
                    current.isLeftThread = true;
                    current.left = prev;
                }
                if (prev !== null && prev.right === null) {
                    prev.isRightThread = true;
                    prev.right = current;
                }
                prev = current;
                if (current != null) {
                    current = current.right;
                }
            }
        }

        // 处理最后一个节点
        if (prev !== null) {
            prev.isRightThread = true;
            prev.right = null;
        }

        return root;
    }

    // 找到第一个节点
    private static FirstNode(root: TreeNode | null): TreeNode | null {
        let current = root;
        while (current !== null && !current.isLeftThread) {
            current = current.left;
        }
        return current;
    }

    // 找到下一个节点
    private static NextNode(node: TreeNode | null): TreeNode | null {
        if (node === null) return null;
        if (!node.isRightThread) {
            return this.FirstNode(node.right);
        } else {
            return node.right;
        }
    }

    // 线索化中序遍历
    public static inOrderTraversalWithThreads(root: TreeNode | null): TreeNode[] {
        const result: TreeNode[] = [];
        let current = this.FirstNode(root);

        while (current !== null) {
            result.push(current); // 访问当前节点
            console.log(current.value);
            current = this.NextNode(current);
        }

        return result;
    }

    /*// 传统中序遍历（用于对比）
    inOrderTraversal(root: TreeNode | null): TreeNode[] {
        const result: TreeNode[] = [];

        const traverse = (node: TreeNode | null): void => {
            if (!node) return;
            traverse(node.left); // 访问左子树
            result.push(node); // 访问根节点
            traverse(node.right); // 访问右子树
        };

        traverse(root);
        return result;
    }*/
}
export default inThreading;
// 示例用法
/*const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
tree.left.right = new TreeNode(5);

const binaryTree = new inThreading();
binaryTree.inOrderThreading(tree);

console.log("线索化中序遍历:", binaryTree.inOrderTraversalWithThreads(tree).map(node => node.value));
//console.log("传统中序遍历:", binaryTree.inOrderTraversal(tree).map(node => node.value));*/