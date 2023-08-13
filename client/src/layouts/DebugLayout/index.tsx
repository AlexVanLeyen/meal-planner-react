import React from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';

const DebugLayout: React.FC = () => {
    const location = useLocation();
    const navigationType = useNavigationType();
    

    React.useEffect(() => {
        console.log("The current URL is", {...location});
        console.log("The last navigation action was", navigationType);
      }, [location, navigationType]);

    return <Outlet />
}

export default DebugLayout;
