import React from 'react';
import { Link } from 'react-router-dom';
import { FaHouse, FaRegCalendar } from 'react-icons/fa6';
import { app } from '@/config';

const Navigation: React.FC = () => {
    return (
        <div className="container">
            <nav>
                <menu>
                    <li><Link to="/"><FaHouse /><div>Home</div></Link></li>
                    <li><Link to="/plans"><FaRegCalendar /><div>Plans</div></Link></li>
                </menu>
            </nav>
            <div className="version">{app.version}</div>
        </div>
    );
};

export default Navigation;
