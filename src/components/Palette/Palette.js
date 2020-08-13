import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import './Palette.css'

class Palette extends Component {
    render() {
        const colors = this.props.colors.map((color) => (
            <ColorBox color={color.color} name={color.name}/> 
        ))
        return (
            <div className='Palette'>
                {/* header goes here */}
                <div className='Palette-colors'>
                    {colors}
                </div>
                {/* footer goes here */}
            </div>
        );
    }
}

export default Palette;