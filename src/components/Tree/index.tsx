import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectNode } from '../store/treeSlice';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface TreeNode {
    id: string;
    name: string;
    properties?: {
        color?: string;
        fontSize?: string;
    };
    children?: TreeNode[];
}

interface TreeNodeProps {
    node: TreeNode;
}

const TreeNodeComponent = ({ node }: TreeNodeProps) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
        dispatch(selectNode(node.id));
    };


    useEffect(() => {
        if (node.properties) {
            const listItem = document.getElementById(node.id);
            if (listItem) {
                listItem.style.color = node.properties.color || 'inherit';
                listItem.style.fontSize = node.properties.fontSize || 'inherit';
            }
        }
    }, [node.properties]);

    return (
        <>
            <ListItem id={node.id} onClick={handleClick}>
                <ListItemText primary={node.name} />
                {node.children ? (open ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItem>
            {node.children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {node.children.map((child) => (
                            <TreeNodeComponent key={child.id} node={child} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export const Tree = () => {
    const nodes = useSelector((state: RootState) => state.tree.nodes);

    return (
        <List>
            {nodes.map((node) => (
                <TreeNodeComponent key={node.id} node={node} />
            ))}
        </List>
    );
};
