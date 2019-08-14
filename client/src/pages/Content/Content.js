import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './content.css';
import Masonry from 'react-masonry-component';

import house1 from './house1.jpg';
import house2 from './house2.jpg';
import house3 from './house3.jpg';
import house4 from './house4.jpg';
import house5 from './house5.jpg';
import house6 from './house6.jpg';

class Content extends Component {
    constructor (props) {
        super(props);
        this.state = {
            placeholder: ''
        };
    }

    render () {
        const imageList = [house1, house2, house3, house4, house5, house6, house4, house1, house6];
        const images = imageList.map((el, i) => {
            return <img key = {i} className='img' src={el} alt='' />;
        });
        return (
            <div>
                <Navbar />
                <div className='placeholder' />
                <div className='buttonmenu'>
                    <div className='buttongrid'>
                        <button className='option'>Cozy</button>
                        <button className='option'>Bohemian</button>
                        <button className='option'>Contemporary</button>
                        <button className='option'>Eclectic</button>
                        <button className='option'>Boho</button>
                        <button className='option'>Traditional</button>
                        <button className='option'>Simple</button>
                    </div>
                </div>
                <div className='contentgrid'>
                    <Masonry
                        className='masonry'
                        elementType={'div'}
                        options={{ fitWidth: true, gutter: 15 }}
                    >
                        {images}
                    </Masonry>
                </div>
            </div>
        );
    }
}

export default Content;
