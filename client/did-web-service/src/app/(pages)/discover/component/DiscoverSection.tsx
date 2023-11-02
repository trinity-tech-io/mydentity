import { FC, ReactNode } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { CardStyled } from "../../account/security/components/SecuritySection";
import { DarkButton } from "@components/button";

interface DiscoverSection {
  logo: ReactNode;
  label: string;
  title: string;
  description: string;
  actionName: string;
  handleAction?: () => void;
}

const DiscoverSection: FC<DiscoverSection> = ({
  logo,
  label,
  title,
  description,
  actionName,
  handleAction,
}) => {
  return (
    <CardStyled elevation={0} className="h-full">
      <Stack className="h-full" spacing={1.5} alignItems="center" sx={{ p: { xs: 1.5, sm: 3 } }}>
        <Avatar
          sx={{
            p: 2,
            width: { xs: 60, sm: 80 },
            height: { xs: 60, sm: 80 },
            background: (theme) =>
              theme.palette.mode == "dark"
                ? theme.palette.background.default
                : theme.palette.primary.light,
          }}
        >
          {logo}
        </Avatar>
        <Box className="rounded-[4px] inline-block bg-[#9291A5] flex px-2 py-0.5">
          <Typography variant="caption" fontSize={9} color="text.primary">
            {label}
          </Typography>
        </Box>
        <Typography variant="h4">{title}</Typography>
        <Typography
          variant="body1"
          textAlign="center"
          className="flex-1"
          sx={{ pb: { xs: 1.5, sm: 3 } }}
        >
          {description}
        </Typography>
        <DarkButton className="w-full">{actionName}</DarkButton>
      </Stack>
    </CardStyled>
  );
};

export default DiscoverSection;
