import { SxProps } from '@mui/system';
import { useTheme } from '@mui/material';

const getStyles = () => {
  const theme = useTheme();

  const quickSearchStyles: SxProps = {
    backgroundColor: theme.palette.common.white,
    p: 1,
    mb: 0.25
  };

  const toolbarStyles: SxProps = {
    ...quickSearchStyles,
    display: 'flex',
    justifyContent: 'space-between'
  };

  const gridStyles: SxProps = {
    '&.MuiDataGrid-root': {
      border: 'none'
    },
    '& .MuiDataGrid-columnHeaders': {
      borderBottomColor: 'transparent'
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: theme.typography.fontWeightBold
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none'
    }
  };

  return { gridStyles, toolbarStyles };
};

export default getStyles;
