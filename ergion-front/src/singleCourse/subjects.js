
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme.js';
import Typography from '@material-ui/core/Typography';
// Generate Order Data

function createData(id, date, name) {
  return { date, name, id };
}

const rows = [
  createData(1, '۹۹/۸/۱۸', 'فیلم جلسه 0 - معرفی دوره صفر تا صد فیزیک یازدهم آقای یاری'),
  createData(2, '۹۹/۸/۱۸', 'فیلم جلسه 1 - مقدمه یادگیری نیرو (قسمت اول)، قانون اول نیوتن'),
  createData(3, '۹۹/۸/۱۸', 'فیلم جلسه 1 - مقدمه یادگیری نیرو (قسمت اول)، قانون اول نیوتن'),
  createData(4, '۹۹/۸/۱۸', 'فیلم جلسه 1 - مقدمه یادگیری نیرو (قسمت اول)، قانون اول نیوتن'),
  createData(5, '۹۹/۸/۱۸', 'فیلم جلسه 1 - مقدمه یادگیری نیرو (قسمت اول)، قانون اول نیوتن'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  all:
  {
    fontFamily: "IRANSans",
  },


}));

export default function Subjects() {
  const classes = useStyles();
  return (
    <React.Fragment>

      <ThemeProvider theme={theme}><div className={classes.all}>
        <Title>مطالب اخیر </Title>
        <Table fontFamily="IRANSans" size="small" className={classes.tablestyle}>
          <TableHead>
            <TableRow>

              <TableCell align="right">تاریخ</TableCell>
              <TableCell align="right">عنوان مطلب</TableCell>
              <TableCell align="right">ردیف</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow align="right" key={row.id}>
                <TableCell align="right">   <Typography component="body2" variant="h2" gutterBottom align="right">
                  {row.date}
                </Typography></TableCell>
                <Link color="primary" href="#" onClick={preventDefault}>   <TableCell align="right">{row.name}</TableCell> </Link>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div></ThemeProvider>
    </React.Fragment>
  );
}