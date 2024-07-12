import React, { useEffect } from 'react'
const lsCache = localStorage;

const Logout = () => {
    React.useEffect(() => {
        lsCache.removeItem('token');
        window.location.href = '/login';
    });
    return (
        <div>Loading......</div>
    )
}

export default Logout;