import React from 'react';
import { Navigate, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const RouteErrorBoundary: React.FC = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return <Navigate replace to="/404" />
    }

    throw error;
};
