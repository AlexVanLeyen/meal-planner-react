import { Loading } from '@/common/components/Loading';
import { useMealPlanCreateMutation, defaultPlan } from '@/common/hooks/useMealPlanMutation';
import { useMealPlansQuery } from '@/common/hooks/useMealPlansQuery';
import React, { useCallback, useEffect } from 'react';
import { Link, useSubmit } from 'react-router-dom';

const Plans = () => {
    const submit = useSubmit();
    const { data: plans, error, isLoading } = useMealPlansQuery();
    const {
        isLoading: isCreateLoading,
        status: createStatus,
        data: createData
    } = useMealPlanCreateMutation(defaultPlan);
    
    const handleCreatePlan = useCallback(() => {
        submit(null, {
            method: "POST",
            action: "/plans/new"
        });
    }, [submit]);

    useEffect(() => {
        console.log("createStatus", createStatus);
        console.log("createData", createData);
    }, [createStatus, createData]);

    if (error instanceof Response) {
        return (<>An error occurred</>);
    }

    if (isLoading) {
        return (
           <div className='page items-center'>
                <Loading />
           </div> 
        )
    }

    return (
        <div className="page">
            <div className="flex justify-between">
                <h1 className="title">Plans</h1>
                <button
                    disabled={isCreateLoading}
                    type="button"
                    className="btn btn-sm primary"
                    onClick={handleCreatePlan}
                >Create Plan</button>
            </div>
            {plans && plans.length > 0 ? (
                <nav>
                    <menu>
                    {plans.map(plan => (
                        <li key={plan._id}>
                            <Link to={`/plans/${plan._id}`}>{plan.name}</Link>
                            <p>{plan.description}</p>
                        </li>
                    ))}
                    </menu>
                </nav>
            ) : (
                <div className="flex flex-col gap-sm items-center h-full">
                    <div>You have no plans yet.</div>
                    <button
                        disabled={isCreateLoading}
                        type="button"
                        className="btn primary"
                        onClick={handleCreatePlan}
                    >Create one now!</button>
                </div>
            )}
        </div>
    )
}

export default Plans
