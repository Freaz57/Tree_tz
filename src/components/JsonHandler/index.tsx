import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loadTree } from '../store/treeSlice';
import { saveAs } from 'file-saver';
import { Button, Stack } from '@mui/material';

export const JsonHandler = () => {
    const dispatch = useDispatch();
    const nodes = useSelector((state: RootState) => state.tree.nodes);

    const handleSave = () => {
        const blob = new Blob([JSON.stringify(nodes, null, 2)], { type: 'application/json' });
        saveAs(blob, 'tree-data.json');
    };

    const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            const json = JSON.parse(content);
            dispatch(loadTree(json));
        };
        reader.readAsText(file);
    };

    return (
        <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
                Сохранить JSON
            </Button>
            <Button variant="contained" component="label" color="secondary">
                Загрузить JSON
                <input type="file" accept="application/json" onChange={handleLoad} hidden />
            </Button>
        </Stack>
    );
};
