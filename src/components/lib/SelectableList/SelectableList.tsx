import React, { useState, useCallback, ReactChild } from 'react';

import { toFlatChildren } from '../../../utils';

import { SelectableListElement } from './style';

export interface SelectableListProps {
    children: ReactChild[];
    listPadding: string;
}

const useListItemClick = () => {
    const [selected, setSelected] = useState(-1);

    const handleSelected = useCallback((onClick: () => void, index: number) => () => {
        if (onClick) {
            onClick();
        }
    
        setSelected(index);
    }, []);

    return { selected, handleSelected };
};

export const SelectableList = ({ children, ...other }: SelectableListProps) => {
    const { selected, handleSelected } = useListItemClick();

    const flatChildren = toFlatChildren(children);
    const items = React.Children.map(flatChildren, (child, index) => {
        if (typeof child ==='string' || typeof child === 'number') {
            return child;
        }
    
        return React.cloneElement(child, {
            selected: typeof child.props.selected === 'undefined' ? selected === index : child.props.selected,
            onClick: handleSelected(child.props.onClick, index),
        });
    });

    return (
        <SelectableListElement {...other}>
            {items}
        </SelectableListElement>
    );
};

export default SelectableList;
