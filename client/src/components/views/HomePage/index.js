import React from 'react';
import {FaCode, FaStar} from 'react-icons/fa';

function HomePage() {
    return(
        <>
            <div className='app'>
                <FaCode style={{fontSize: '4rem'}} /><br />
                <span style={{fontSize: '2rem'}}>Let's start coding!</span>
                <br />
                <span>Thanks for using MyERN boilerplate by Shashank Jha</span>
                <br />
                <p> <a href="https://github.com/shashankj99/MyERN_boilerplate" target="_blank">Rate a star to support the project! </a> <FaStar /></p>
            </div>
        </>
    );
}

export default HomePage;
