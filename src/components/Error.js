import React from 'react';

function Error({error}){
    return (
        <div className="flex justify-center items-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline">{error}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M14.59 7.41L13.17 6 10 9.17 6.83 6 5.41 7.41 8.59 10.59 5.41 13.59 6.83 15 10 11.83 13.17 15 14.59 13.59 11.41 10.59z" />
                </svg>
                </span>
            </div>
        </div>
    )
}

export default Error;