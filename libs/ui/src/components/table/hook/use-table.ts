import { useRef } from 'react';
import { AnyObject } from 'src/types';

export interface TableFetchConfig {
  disableLoading?: boolean;
  extraFilter?: AnyObject;
}

type Callbacks = {
  fetchData?: (tableFetchConfig?: TableFetchConfig) => void;
  setFilterData?: (filterData: AnyObject) => void;
};

export interface TableInstance {
  fetchData: (disableLoading?: TableFetchConfig) => void;
  setFilterData: (filterData: AnyObject) => void;
  getInternalHooks: () => {
    setCallbacks: (callbacks: Callbacks) => void;
  };
}

class TableStore {
  private store: any = {};
  private callbacks: Callbacks = {};
  constructor() {
    this.store = {};
    this.callbacks = {};
  }
  setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks;
  };
  private getInternalHooks = () => {
    return {
      setCallbacks: this.setCallbacks,
    };
  };
  public getTable = () => {
    return {
      fetchData: this.fetchData,
      setFilterData: this.setFilterData,
      getInternalHooks: this.getInternalHooks,
    };
  };
  private fetchData = (tableFetchConfig?: TableFetchConfig) => {
    if (this.callbacks.fetchData) {
      this.callbacks?.fetchData?.(tableFetchConfig);
    } else {
      setTimeout(() => {
        this.fetchData(tableFetchConfig);
      });
    }
  };
  private setFilterData = (filterData: AnyObject) => {
    if (this.callbacks.fetchData) {
      this.callbacks?.setFilterData?.(filterData);
    } else {
      setTimeout(() => {
        this.setFilterData(filterData);
      });
    }
  };
}

export default function useTable(table?: TableInstance) {
  const tableRef = useRef<TableInstance>();

  if (!tableRef.current) {
    if (table) {
      tableRef.current = table;
    } else {
      const tableStore = new TableStore();
      tableRef.current = tableStore.getTable();
    }
  }
  return [tableRef.current];
}
