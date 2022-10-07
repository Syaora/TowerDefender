import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Stack from '@mui/material/Stack'

export default function ErrorMessage({ errors }) {

  return (
    <Stack sx={{ paddingTop: "30px", width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {errors ? errors.map(error => <div key={error.id}><strong>{error[0]}</strong> {error[1]}</div>) : null}
      </Alert>
    </Stack>
  )
}