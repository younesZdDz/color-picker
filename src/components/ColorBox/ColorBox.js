import React, { Component } from 'react';
import './ColorBox.css'

class ColorBox extends Component {
    render() {
        const {background, name} = this.props;
        return (
            <div style={{ background }} className="ColorBox">
                <div className="copy-container">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                    <button className="copy-button">copy</button>
                </div>
                <span className='see-more'>more</span>
            </div>
        );
    }
}

export default ColorBox;