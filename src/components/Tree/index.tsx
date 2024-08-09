import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectNode } from '../store/treeSlice';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface TreeNode {
    id: string;
    name: string;
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

    return (
        <>
            <ListItem onClick={handleClick}>
                <ListItemText primary={node.name} />
                {node.children ? (open ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItem>
            {node.children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {node.children.map((child: any) => (
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
