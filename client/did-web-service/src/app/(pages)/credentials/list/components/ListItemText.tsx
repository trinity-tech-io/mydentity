import { FC } from "react";
import { ListItemText } from "@mui/material";

const ListItemTextStyled: FC<{ primary: string; secondary: string }> = ({
  primary,
  secondary,
}) => {
  return (
    <ListItemText
      primary={primary}
      secondary={secondary}
      primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
      secondaryTypographyProps={{
        fontSize: 11,
        sx: { wordBreak: "break-all" },
      }}
    />
  );
};

export default ListItemTextStyled;
