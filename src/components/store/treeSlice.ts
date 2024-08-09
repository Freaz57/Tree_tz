import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TreeNode {
    id: string;
    name: string;
    children?: TreeNode[];
    properties?: {
        color?: string;
        fontSize?: string;
    };
}

interface TreeState {
    nodes: TreeNode[];
    selectedNodeId: string | null;
}

const initialState: TreeState = {
    nodes: [
        {
            id: '1',
            name: 'Root Node',
            children: [
                {
                    id: '2',
                    name: 'Child Node 1',
                    children: [
                        {
                            id: '4',
                            name: 'Grandchild Node 1.1',
                            properties: {
                                color: 'red',
                                fontSize: '12px',
                            },
                        },
                        {
                            id: '5',
                            name: 'Grandchild Node 1.2',
                            properties: {
                                color: 'green',
                                fontSize: '20px',
                            },
                        },
                    ],
                    properties: {
                        color: 'gray',
                        fontSize: '15px',
                    },
                },
                {
                    id: '3',
                    name: 'Child Node 2',
                    properties: {
                        color: 'blue',
                        fontSize: '11px',
                    },
                },
            ],
        },
    ],
    selectedNodeId: null,
};


const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {

        selectNode: (state, action: PayloadAction<string>) => {
            state.selectedNodeId = action.payload;
        },

        updateNodeProperties: (
            state,
            action: PayloadAction<{ nodeId: string; properties: Record<string, any> }>
        ) => {
            const node = findNodeById(state.nodes, action.payload.nodeId);
            if (node) {
                node.properties = { ...node.properties, ...action.payload.properties };
            }
        },

        loadTree: (state, action: PayloadAction<TreeNode[]>) => {
            state.nodes = action.payload;
        },
    },
});


export const { selectNode, updateNodeProperties, loadTree } = treeSlice.actions;
export default treeSlice.reducer;


function findNodeById(nodes: TreeNode[], id: string): TreeNode | undefined {
    for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
            const found = findNodeById(node.children, id);
            if (found) return found;
        }
    }
    return undefined;
}
