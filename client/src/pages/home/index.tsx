import React from 'react';
import { PlanTable } from '../../common/components/PlanTable';

export const Home: React.FC = () => {
    return (
        <div className='container min-w-full p-4 h-full overflow-auto'>
            <PlanTable />
        </div>
    );
}
