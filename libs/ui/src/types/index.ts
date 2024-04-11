import { CSSProperties } from 'react';

export type AnyObject = Record<string | number | symbol, any>;

export type IListItem = {
  label?: string | number;
  value?: string | number;
  options?: IListItem[];
  [key: string]: any;
};

export interface componentStyleAndClass {
  style?: CSSProperties;
  className?: string;
}
