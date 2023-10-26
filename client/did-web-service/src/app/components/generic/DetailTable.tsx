import { FC, ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableRowOwnProps,
} from "@mui/material";

/**
 * Component to be used as table row within following table component body.
 * First cell contains avatar component.
 */
export const DetailTableRow: FC<{
  avatar: ReactNode;
  rowCells: ReactNode;
  className?: string;
  props?: TableRowOwnProps;
  onClick?: () => void;
}> = ({
  avatar,
  rowCells,
  className = "",
  props = {},
  onClick = (): void => {},
}) => {
  return (
    <TableRow {...props} className={className} onClick={onClick}>
      <TableCell padding="none" sx={{ width: 0 }}>
        {avatar}
      </TableCell>
      {rowCells}
    </TableRow>
  );
};

/**
 * Component to be used as table in several widgets such as Recent Activiy.
 * Table header has a linear gradient style and first cell of every table body rows contains avatar component.
 */
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
            "linear-gradient(to right, transparent, #4e4e4eb3 25%, #555555b3 50%, #4e4e4eb3 75%, transparent)",
          th: {
            px: 1,
            fontSize: { xs: 12, sm: 15 },
            lineHeight: { xs: "1.2rem", sm: "1.5rem" },
            fontWeight: "600",
          },
          "th:last-child": { textAlign: "right" },
        },
        tbody: {
          td: { px: 1, py: 0 },
          "td:first-child": { border: 0, pl: 0, pr: 1 },
          "td:last-child": { textAlign: "right", pr: 0 },
          "tr:last-child": {
            td: {
              border: 0,
            },
          },
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
