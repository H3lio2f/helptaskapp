import { Menu, TableCell, TableRow, Tooltip } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useSnackbar } from "notistack";
import * as React from 'react';
import { useGlobal } from "../../utils/contexts/global";
import moment from 'moment';

export default function Row({ row, labelId }) {
  
    return (
      <>
    <TableRow
        tabIndex={-1}
        key={row.id}
        style={{ cursor: "pointer"}}
    >
        <TableCell align="left">
        </TableCell>
        <TableCell align="left">{row.action}</TableCell>
        <TableCell align="left">{row.object}</TableCell>
        <TableCell align="left">{row.user}</TableCell>
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left" style={{ width: "150px"}}>{moment(row.created_at).format("DD/MM/YYYY HH:MM")}</TableCell>
    </TableRow>
    </>
    );
}
