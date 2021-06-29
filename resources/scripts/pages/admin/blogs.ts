import $ from 'jquery';
import Table from '../../components/Table/index';

(function () {
  const COLUMNS = [
    {
      label: 'title',
      field: 'title'
    },
    {
      label: 'description',
      field: 'description'
    },
    {
      label: 'created date',
      field: 'createdDate'
    }
  ];
  const config = {
    appendTo: $('.blogs-list__table'),
    columns: COLUMNS,
    classes: {
      root: 'table-hover',
      thead: 'text-capitalize'
    }
  };
  const blogList = new Table(config);
  blogList.insert([
    { title: 'test 0', description: 'abcd', createdDate: new Date() },
    { title: 'test 1', description: 'ddda', createdDate: new Date() },
    { title: 'test 0', description: 'cvcx', createdDate: new Date() },
    { title: 'test 1', description: 'rfsc', createdDate: new Date() },
    { title: 'test 0', description: 'vdss', createdDate: new Date() },
    { title: 'test 1', description: 'qwqq', createdDate: new Date() },
    { title: 'test 0', description: 'werf', createdDate: new Date() },
    { title: 'test 1', description: 'vvvv', createdDate: new Date() },
    { title: 'test 0', description: 'ccgr', createdDate: new Date() },
    { title: 'test 1', description: 'bf4s', createdDate: new Date() },
    { title: 'test 0', description: 'f24f', createdDate: new Date() },
    { title: 'test 1', description: 'rt12', createdDate: new Date() },
    { title: 'test 0', description: 'vv21', createdDate: new Date() },
    { title: 'test 1', description: '111d', createdDate: new Date() }
  ]);
})();
