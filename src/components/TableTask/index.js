import * as React from 'react';
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Menu} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { tableCellClasses } from '@mui/material/TableCell';
import useSWR from 'swr';

const Row = dynamic(() => import('./Row'));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'var(--primary)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: true,
    disablePadding: true,
    label: 'Assunto',
  },
  {
    id: 'client_name',
    numeric: true,
    disablePadding: false,
    label: 'Cliente',
  },
  {
    id: 'dueDate',
    numeric: true,
    disablePadding: false,
    label: 'Data',
  },
  {
    id: 'type_name',
    numeric: true,
    disablePadding: false,
    label: 'Tipo',
  },
  {
    id: 'user_name',
    numeric: true,
    disablePadding: false,
    label: 'Atribuído a',
  },
  {
    id: 'status_name',
    numeric: true,
    disablePadding: false,
    label: 'Estado',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Acções',
  },
];

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

function EnhancedTableHead(props) {
  const { data: userLogged } = useSWR("/api/userLogged", fetcher, { revalidateOnInterval: 1000});
  const {  order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell >
        </StyledTableCell>
        {(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager")  ? (
            <>
            {headCells.map((headCell) =>  (
            <StyledTableCell
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
          </>
          ) : (
            <>
            {headCells.map((headCell) => headCell.id !== "status_name" && (
            <StyledTableCell
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
          </>
          )}
        
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable({ tasks }) {

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /*Menu Option */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <Paper  sx={{ width: '100%', mt: 3, overflow: 'hidden' }}>
        <TableContainer className={`${rowsPerPage > 10 && "scroll-bar"}`} sx={rowsPerPage > 10 ? { height: 640 } : { }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
            stickyHeader
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tasks.length}
            />
            <TableBody>
              {stableSort(tasks, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <Row  key={row.id} row={row} labelId={`enhanced-table-checkbox-${index}`}/>
                )
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={<span>linhas por página:</span>}
        />
    </Paper>
  );
}
