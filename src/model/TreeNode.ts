class TreeNode {
  value: any; // 节点值可以是任何类型
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  id: number|null;
  

  constructor(value: any) {
      this.value = value;
      this.id = null;  // 节点ID
  }
}

class Tree {
  constructor() {
    this.root = null;
  }
  root: TreeNode | null;

  
}

export { TreeNode, Tree };
