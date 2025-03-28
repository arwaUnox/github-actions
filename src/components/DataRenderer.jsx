import React from 'react';
import { Spinner } from './ui';

function DataRenderer({ isLoading, error, children }) {
  if (isLoading) {
    return (
      <div className='flex h-[100vh] items-center justify-center'>
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className='flex h-[100vh] items-center justify-center'>{error}</div>
    );
  }
  return children;
}

export default DataRenderer;
