import React from 'react';
import { createHashRouter } from 'react-router-dom';
import Component from 'src/views/component';
import FormComponent from 'src/views/form';
import { Layout } from 'src/views/layout';
import ModalComponent from 'src/views/modal';
import TableComponent from 'src/views/table';

export const routes: any = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TableComponent />,
      },
      {
        path: 'form',
        element: <FormComponent />,
      },
      {
        path: 'modal',
        element: <ModalComponent />,
      },
      {
        path: 'component',
        element: <Component />,
      },
    ],
  },
]);
