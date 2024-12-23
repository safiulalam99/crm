import {
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box
} from '@mui/material';

const CountrySaleTable = ({ data }) => {
  return (
    <>
      <TableContainer component={CardContent}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>country</TableCell>
              <TableCell align="right">Earning</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((country, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Box
                    component="img"
                    src={
                      country.file_url.startsWith('//')
                        ? `https:${country.file_url}`
                        : country.file_url
                    }
                    alt={country.country}
                    sx={{
                      width: 24,
                      height: 24,
                      marginRight: 2,
                      display: 'inline-block',
                      verticalAlign: 'middle'
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="body2" display="inline">
                    {country.country}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    <b>{country?.value?.toFixed(2)}</b>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CountrySaleTable;
