import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PaletteList extends Component {
    render() {
        const palettes = this.props.palettes.map(palette =>{
            return <p><Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link></p>
        })
        return (
            <div>
                <h1>React Colors !</h1>
                {palettes}
            </div>
        );
    }
}

export default PaletteList;