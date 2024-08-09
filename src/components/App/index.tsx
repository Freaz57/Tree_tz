import React from 'react';
import { Tree } from '../Tree';
import { Properties } from '../Properties';
import { JsonHandler } from '../JsonHandler';
import { Grid, Container, Paper, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface TreeNode {
    id: string;
    name: string;
    properties?: {
        color?: string;
        fontSize?: string;
    };
    children?: TreeNode[];
}

const App = () => {
    const selectedNodeId = useSelector((state: RootState) => state.tree.selectedNodeId);
    const nodes = useSelector((state: RootState) => state.tree.nodes);

    const findNodeById = (id: string | null, nodes: TreeNode[]): TreeNode | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findNodeById(id, node.children);
                if (found) return found;
            }
        }
        return null;
    };

    const selectedNode = findNodeById(selectedNodeId, nodes);
    const nodeName = selectedNode ? selectedNode.name : "Не выбрано";
    const textColor = selectedNode?.properties?.color;
    const fontSize = selectedNode?.properties?.fontSize || "16px";

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Управление Деревом Элементов
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper style={{ padding: '10px', height: '100%' }}>
                        <Typography variant="h6">Дерево элементов</Typography>
                        <Tree />
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper style={{ padding: '10px', height: '100%' }}>
                        <Typography
                            variant="h6"
                            style={{ color: textColor, fontSize: fontSize }}
                        >
                            Свойства выбранного элемента: {nodeName}
                        </Typography>
                        <Properties />
                        <JsonHandler />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default App;
