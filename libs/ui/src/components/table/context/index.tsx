import React from 'react';
import { TableFetchConfig } from '../hook/use-table';

export const TableContext = React.createContext<{
  fetchData?: (tableFetchConfig?: TableFetchConfig) => void;
}>({});

export const useTableContext = () => {
  const context = React.useContext(TableContext);
  return context;
};
