import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import '../src/styles/index.scss';

const withBossUiProvider = (Story: any) => {
  return (
    <RouterProvider
      router={createHashRouter([{ path: '*', element: <Story /> }])}
    />
  );
};
export const decorators = [withBossUiProvider];
