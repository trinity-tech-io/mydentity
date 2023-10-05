import { FC, ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export const DetailTableRow: FC<{ avatar: ReactNode; rowCells: ReactNode; className?: string }> = ({
  avatar,
  rowCells,
  className = ""
}) => {
  return (
    <TableRow
      className={className}
    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell padding="none">{avatar}</TableCell>
      {rowCells}
    </TableRow>
  );
};
export const DetailTable: FC<{ headCells: ReactNode; bodyRows: ReactNode }> = ({
  headCells,
  bodyRows,
}) => {
  return (
    <Table
      size="small"
      sx={{
        th: { border: 0 },
        thead: {
          background:
            "linear-gradient(to right, transparent, #444 25%, #3e3e3e 50%, #444 75%, transparent)",
          th: { px: 1, fontSize: 15, fontWeight: "600" },
          "th:last-child": { textAlign: "right" },
        },
        tbody: {
          td: { px: 1, py: 0 },
          "td:first-child": { border: 0, pl: 0, pr: 1 },
          "td:last-child": { textAlign: "right" },
          "tr:last-child": {
            td: {
              border: 0
            }
          }
        },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: 0 }} />
          {headCells}
        </TableRow>
      </TableHead>
      <TableBody>{bodyRows}</TableBody>
    </Table>
  );
};
