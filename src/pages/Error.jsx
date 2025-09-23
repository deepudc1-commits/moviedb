import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router'

const Error = () => {
  const error = useRouteError();
  console.log(error);
  
  if(isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-4">
        We're sorry, but an unexpected error has occurred.
      </p>
      <p className="italic">
        {isRouteErrorResponse(error) ? error.statusText : error.message}
      </p>
    </div>
  );
}

export default Error
