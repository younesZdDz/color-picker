import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import NavBar from "../NavBar/NavBar";

import './Palette.css'

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: "hex" };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level) {
        this.setState({ level });
    }
    changeFormat(value) {
        this.setState({ format: value });
    }
    render() {
        const { colors } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} />
        ))
        return (
            <div className='Palette'>
                {/* header goes here */}
                <NavBar
                    level={level}
                    format={format}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                />                
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                {/* footer goes here */}
            </div>
        );
    }
}

export default Palette;