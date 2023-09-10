import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { useSnackbar } from 'src/contexts/SnackbarContext';

function GlobalSnackbar() {
  const { snackbarInfo, closeSnackbar } = useSnackbar();

  return (
    <Snackbar
      open={snackbarInfo.open}
      onClose={closeSnackbar}
      autoHideDuration={3000}
      anchorOrigin={{ vertical:'bottom', horizontal:'right' }}

    >
      <Alert severity={snackbarInfo.severity as AlertColor}>
        {snackbarInfo.message}
      </Alert>
    </Snackbar>
  );
}
export default GlobalSnackbar;
