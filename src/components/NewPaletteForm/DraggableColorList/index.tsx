import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { BasicColorType } from '../../../types';
import DraggableColorBox from './DraggableColorBox';

interface Props {
    colors: BasicColorType[];
    removeColor: (colorName: string) => void;
}
const colorList: React.FC<Props> = ({ colors, removeColor }) => (
    <div style={{ height: '100%' }}>
        {colors.map((color, i) => (
            <DraggableColorBox
                index={i}
                key={color.name}
                color={color.color}
                name={color.name}
                removeColor={() => removeColor(color.name)}
            />
        ))}
    </div>
);
const DraggableColorList = SortableContainer(colorList);
export default DraggableColorList;
