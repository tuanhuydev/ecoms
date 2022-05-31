import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: () => ({
    width: 150,
    display: 'flex',
    background: '#FAFAFA',
    borderRadius: 4,
    '&:hover': {
      background: '#EEE'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  })
};

const BaseSelect = (props: any) => {
  return (
    <Select {...props} styles={customStyles} width='300px' />
  );
};

export default BaseSelect;
