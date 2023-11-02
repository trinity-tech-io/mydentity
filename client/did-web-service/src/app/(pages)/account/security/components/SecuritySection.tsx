import { FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { DarkButton } from "@components/button";
import { IconAvatar } from "@components/feature/DetailLine";
import PassStateLabel, {
  StateTextSize,
} from "@components/generic/PassStateLabel";
import { LoadingSecurityContent } from "@components/loading-skeleton";
import { useMounted } from "@hooks/useMounted";

export const CardStyled = styled(Card)(({ theme }) => ({
  border: "1px solid #FFFFFF55",
  borderRadius: "0.5rem",
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
  disabledAction?: boolean; // whether the related button is disabled or not
  disabledSkel?: boolean; // whether the loading skeleton is visible or not
  loaded?: boolean | null; // if null, initial loading state is depending on 'mounted'
}> = ({
  title,
  icon,
  children,
  className = "",
  isSet = null,
  statusTitle,
  actionTitle,
  handleAction = (): void => {},
  actionInProgress = false,
  disabledAction = false,
  disabledSkel = false,
  loaded = null,
}) => {
  const { mounted } = useMounted();
  const initialLoaded = loaded !== null ? loaded : mounted;
  return (
    <CardStyled className={className} elevation={0}>
      <Box
        className="relative z-10 flex flex-col h-full"
        sx={{ px: { xs: 1.5, sm: 3 }, pt: { xs: 1, sm: 1.5 }, pb: 1.5 }}
      >
        <Box className="pb-4 pt-2 flex items-center">
          <IconAvatar>{icon}</IconAvatar>
          <Typography
            className="flex-1"
            variant="h6"
            fontWeight={600}
            sx={{ ml: 1 }}
          >
            {title}
          </Typography>
          {mounted && isSet !== null && (
            <PassStateLabel
              isPassed={isSet}
              title={statusTitle}
              size={StateTextSize.SMALL}
            />
          )}
        </Box>
        {disabledSkel ? (
          <>
            <div className="flex-1 pb-[5%]">{children}</div>
            <DarkButton
              onClick={handleAction}
              loading={!initialLoaded || actionInProgress}
              disabled={disabledAction}
            >
              {initialLoaded ? actionTitle : "LOADING ..."}
            </DarkButton>
          </>
        ) : (
          <>
            {initialLoaded ? (
              <>
                <div className="flex-1 pb-[5%]">{children}</div>
                <DarkButton
                  onClick={handleAction}
                  loading={actionInProgress}
                  disabled={disabledAction}
                >
                  {actionTitle}
                </DarkButton>
              </>
            ) : (
              <LoadingSecurityContent />
            )}
          </>
        )}
      </Box>
    </CardStyled>
  );
};

export default SecuritySection;
