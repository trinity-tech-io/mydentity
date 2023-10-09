import { FC, ReactNode } from "react";
import clsx from "clsx";
import { Box, Card, CardContent, styled } from "@mui/material";
import { DarkButton } from "@components/button";
import { IconAvatar } from "@components/feature/DetailLine";
import { useMounted } from "@hooks/useMounted";
import { LoadingSecurityContent } from "@components/loading-skeleton";

const CardStyled = styled(Card)(({ theme }) => ({
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
  isSet: boolean;
  statusTitle: string;
  actionTitle: string;
  handleAction?: () => void;
}> = ({
  title,
  icon,
  children,
  className = "",
  isSet,
  statusTitle,
  actionTitle,
  handleAction = (): void => {},
}) => {
  const { mounted } = useMounted();
  return (
    <CardStyled className={clsx("border bord", className)} elevation={0}>
      <CardContent
        className="relative z-10 flex flex-col h-full"
        sx={{ px: 3, pt: 1 }}
      >
        <Box className="pb-4 pt-2 flex items-center">
          <IconAvatar>{icon}</IconAvatar>
          <span className="flex-1 text-[20px] font-semibold ml-2">{title}</span>
          {mounted && (
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
            <DarkButton onClick={handleAction}>{actionTitle}</DarkButton>
          </>
        ) : (
          <LoadingSecurityContent />
        )}
      </CardContent>
    </CardStyled>
  );
};

export default SecuritySection;
