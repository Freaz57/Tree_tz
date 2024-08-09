import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateNodeProperties } from '../store/treeSlice';
import { Tabs, Tab, TextField, Card, CardContent, Typography } from '@mui/material';

export const Properties = () => {
    const selectedNodeId = useSelector((state: RootState) => state.tree.selectedNodeId);
    const nodes = useSelector((state: RootState) => state.tree.nodes);
    const dispatch = useDispatch();
    const [tabIndex, setTabIndex] = useState(0);

    const findNodeById = (id: string | null) => {
        const findNode = (nodes: any[]): any | null => {
            for (const node of nodes) {
                if (node.id === id) return node;
                if (node.children) {
                    const found = findNode(node.children);
                    if (found) return found;
                }
            }
            return null;
        };
        return findNode(nodes);
    };

    const selectedNode = findNodeById(selectedNodeId);

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    };

    const handlePropertyChange = (propertyName: string, value: string) => {
        if (selectedNode) {
            dispatch(updateNodeProperties({ nodeId: selectedNode.id, properties: { [propertyName]: value } }));
        }
    };

    if (!selectedNode) {
        return <Typography variant="h6">Выберите элемент в дереве</Typography>;
    }

    const properties = selectedNode.properties || {};

    return (
        <Card>
            <CardContent>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    {Object.keys(properties).map((key, index) => (
                        <Tab key={key} label={key} />
                    ))}
                </Tabs>
                {Object.keys(properties).map((key, index) => (
                    tabIndex === index && (
                        <div key={key} style={{ marginTop: 16 }}>
                            <TextField
                                label={key}
                                value={properties[key]}
                                onChange={(e) => handlePropertyChange(key, e.target.value)}
                                margin="normal"
                                fullWidth
                            />
                        </div>
                    )
                ))}
            </CardContent>
        </Card>
    );
};
