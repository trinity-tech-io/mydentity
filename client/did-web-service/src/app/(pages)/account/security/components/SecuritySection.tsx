import { DarkButton } from "@components/button";
import { IconAvatar } from "@components/feature/DetailLine";
import { LoadingSecurityContent } from "@components/loading-skeleton";
import { useMounted } from "@hooks/useMounted";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { FC, ReactNode } from "react";

export const CardStyled = styled(Card)(({ theme }) => ({
  border: "1px solid #FFFFFF55",
  borderRadius: "0.5rem",
  background: "#1D1D1D",
  position: "relative",
}));
const SecuritySection: FC<{
  title: string | ReactNode;
  icon: ReactNode;
  className?: string;
  children: ReactNode;
  isSet?: boolean | null;
  statusTitle?: string;
  actionTitle: string;
  handleAction?: () => void;
  actionInProgress?: boolean; // whether the related button action is already in progress, so we can disable the button
}> = ({
  title,
  icon,
  children,
  className = "",
  isSet = null,
  statusTitle,
  actionTitle,
  handleAction = (): void => { },
  actionInProgress = false
}) => {
    const { mounted } = useMounted();
    return (
      <CardStyled className={className} elevation={0}>
        <CardContent
          className="relative z-10 flex flex-col h-full"
          sx={{ px: 3, pt: 1 }}
        >
          <Box className="pb-4 pt-2 flex items-center">
            <IconAvatar>{icon}</IconAvatar>
            <Typography className="flex-1" variant="h6" fontWeight={600} sx={{ ml: 1 }}>{title}</Typography>
            {mounted && isSet !== null && (
              <Box
                className={clsx(
                  "rounded-md text-[7pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",
                  isSet ? "bg-[#34A853]" : "bg-[#EA4335]"
                )}
              >
                {statusTitle}
              </Box>
            )}
          </Box>
          {mounted ? (
            <>
              <div className="flex-1 pb-[5%]">{children}</div>
              <DarkButton onClick={handleAction} loading={actionInProgress}>{actionTitle}</DarkButton>
            </>
          ) : (
            <LoadingSecurityContent />
          )}
        </CardContent>
      </CardStyled>
    );
  };

export default SecuritySection;
