import React from 'react';
import { PlanTable } from '../../common/components/PlanTable';

export const Home: React.FC = () => {

    function handleThemeChange (event: React.ChangeEvent<HTMLSelectElement>) {
        if (document.firstElementChild) {
            document.firstElementChild.classList.value = event.target.value;
        }
    }

    return (
        <>
        <label>
            Theme:
            <select onChange={handleThemeChange}>
                <option value="theme-light">Light</option>
                <option value="theme-dark">Dark</option>
                <option value="theme-mono">Mono</option>
                <option value="theme-mono-slate">Mono Slate</option>
            </select>
        </label>
        <div className='container min-w-full p-4 h-full overflow-auto'>
            <PlanTable />
        </div>
        </>
    );
}
