import TableContainer from "@mui/material/TableContainer"
import { Table as MuiTable } from "@mui/material/"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import Pagination from "@mui/material/Pagination"

import Spinner from "./Spinner"

import "./Table.css"

/**
 * @param {{
 *  loading?: boolean
 *  headers: {
 *    key: string
 *    label?: string
 *    align?: 'left' | 'right' | 'center'
 *    visible?: boolean
*     width?:number
*     minWidth?:number
*     maxWidth?:number
 *  }[]
 *  records: any[]
 *  pagination?: {
 *    current: number
 *    total: number
 *    onChange: any
 *  }
 * }} args 
 */
export default function Table({ loading, headers, records, pagination }) {
  return (
    <div className={`table ${pagination ? "pagination" : ""}`}>
      <TableContainer className="table-container">
        <MuiTable stickyHeader>
          <TableHead className="table-header">
            <TableRow>
              {
                headers.map(header => header.visible !== false && (
                  <TableCell
                    key={header.key}
                    align={header.align}
                    width={header.width}
                    style={{ minWidth: header.minWidth, maxWidth: header.maxWidth }}>
                    {header.label}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {
              loading
                ? (
                  <TableRow className="table-empty-row">
                    <TableCell colSpan={headers.length}>
                      <Spinner />
                    </TableCell>
                  </TableRow>
                )
                : records.length > 0
                  ? records.map((record, index) => (
                    <TableRow key={index} className="table-data-row">
                      {
                        headers.map(header => header.visible !== false && (
                          <TableCell
                            key={header.key}
                            align={header.align}
                            width={header.width}
                            style={{ minWidth: header.minWidth, maxWidth: header.maxWidth }}>
                            {record[header.key]}
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  ))
                  : (
                    <TableRow className="table-empty-row">
                      <TableCell
                        colSpan={headers.length}
                        align="center">
                        No records found
                      </TableCell>
                    </TableRow>
                  )
            }
          </TableBody>
        </MuiTable>
      </TableContainer>
      {
        !loading && pagination && (
          <div className="table-footer">
            <Pagination
              count={pagination.total}
              page={pagination.current + 1}
              onChange={(_event, page) => {
                if (page === pagination.current + 1) { return }
                pagination.onChange(page - 1)
              }}
            />
          </div>
        )
      }
    </div>
  )
}
