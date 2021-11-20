import JQuery from 'jquery';
import clsx from 'clsx';
import { TableConfig, ColumnConfig, TableInstance } from './types';
import cloneDeep from 'lodash/cloneDeep';
import { makeRandomString } from '../../utils/helpers';
import { EmptyObject } from '../../types/custom';

class Table {
  private config: TableConfig;
  private instance: TableInstance;

  constructor(config: TableConfig) {
    const { data = [], ...restConfig } = config;
    this.config = restConfig;
    this.instance = { data };
    this.init();
  }

  /**
   * Make Hashmap for table
   */
  private makeMatrix(): void {
    let pageSize = this.config?.pageSize || 10;
    // TODO: Make pagination
    if (this.instance.data?.length > pageSize) {
      pageSize = this.instance.data?.length;
    }
    const templateRow: EmptyObject = {};
    const matrix: EmptyObject = {};

    this.config.columns.forEach(({ field }: ColumnConfig) => {
      templateRow[field] = null;
    });

    for (let index = 0; index < pageSize; index++) {
      /**
       * Object assignment just link pointer
       * => force deepClone
       */
      matrix[index] = cloneDeep(templateRow);
    }
    this.instance.matrix = matrix;
  }

  /**
   * Render table header HTML element
   * @param {Array<TableConfig>} columns
   * @returns {void}
   */
  private makeHeader(columns: Array<ColumnConfig>): void {
    columns.forEach((column: ColumnConfig) => {
      const columnClasses = clsx('col', column?.headerClass);
      const headerColumn = JQuery(`<th scope="col" class="${columnClasses}"></th>`).text(column.label);
      this.instance.element.children('.thead').append(headerColumn);
    });
  }

  /**
   * Make table instance HTML element
   */
  private makeTableView(): void {
    const { columns = [], classes = {} } = this.config;
    const { root = '', thead = '', tbody = '' } = classes;

    const rootClasses = clsx('table', root);
    const theadClasses = clsx('thead', thead);
    const tbodyClasses = clsx('tbody', tbody);

    this.instance.element = JQuery(`<table id="${makeRandomString(6)}" class="${rootClasses}">
            <thead class="${theadClasses}"></thead>
            <tbody class="${tbodyClasses}"></tbody>
        </table>`);
    this.makeHeader(columns);
  }

  private makeNoRecordView(): void {
    const { noRecord = '' } = this.config?.classes || {};
    if (this.instance && !this.instance.data?.length) {
      const noRecordClasses = clsx('no-record', noRecord);
      const noRecordElement = JQuery(
        `<div id=${makeRandomString(4)} class="no-record ${noRecordClasses}">No record</div>`
      );
      this.instance.element.children('tbody').append(noRecordElement);
    }
  }

  /**
   * Clear tbody elements and re-renders cells
   */
  private updateView(): void {
    // Clear all tbody current elements
    const tbodyElement = this.instance.element.children('tbody');
    tbodyElement.empty();

    const matrix = this.instance.matrix;

    // Render rows and cells
    Object.keys(matrix).forEach((key) => {
      const row = JQuery(`<tr data-index="row-${key}"></tr`);
      Object.keys(matrix[key]).forEach((cellKey) => {
        row.append(JQuery(`<td>${matrix[key][cellKey]}</td>`));
      });
      tbodyElement.append(row);
    });
  }

  /**
   * Insert new data to table
   * @param {Array<any>} data
   */
  public insert(data: Array<any>): void {
    this.instance.data = data;
    this.makeMatrix();
    const matrix = this.instance.matrix;

    data.forEach((obj: any, index: number) => {
      Object.keys(obj).forEach((key: string) => {
        matrix[index][key] = obj[key];
      });
    });
    this.updateView();
  }

  /**
   * Init checking and build table
   */
  private init() {
    this.makeMatrix();
    if (!this.instance?.element) {
      this.makeTableView();
    }

    if (!this.instance?.data?.length) {
      this.makeNoRecordView();
    } else {
      this.insert(this.config.data);
    }
    const appendTo = this.config?.appendTo || JQuery('body');
    JQuery(appendTo).append(this.instance.element);
  }
}

export default Table;
