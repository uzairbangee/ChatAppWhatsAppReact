import React from 'react';

const Loading = ({type}) => {
    return (
        <div className={type} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Loading;