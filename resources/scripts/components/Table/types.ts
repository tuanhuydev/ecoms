import JQuery from 'jquery';
import { EmptyObject } from '../../types/custom';

export interface ColumnConfig {
  field: string;
  label: string;
  headerClass?: string;
}

export interface TableClasses {
  root?: string;
  thead?: string;
  tbody?: string;
  noRecord?: string;
}

export interface TableInstance {
  matrix?: EmptyObject;
  element?: JQuery<HTMLElement>;
  data?: Array<any>;
}

export interface TableConfig {
  appendTo?: JQuery<HTMLElement>;
  columns?: Array<ColumnConfig>;
  data?: any;
  classes?: TableClasses;
  pageSize?: number;
}
