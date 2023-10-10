import FingerprintIcon from "@assets/images/fingerprint.svg";
import ComfirmDialog from "@components/generic/ComfirmDialog";
import { logger } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Browser } from "@model/browser/browser";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { FC, MouseEvent, useState } from "react";
import { CardStyled } from "./SecuritySection";
import { Box, Typography } from "@mui/material";
import { Icon as ReactIcon } from "@iconify/react"

export const BrowserRow: FC<{
  browser: Browser;
}> = ({ browser }) => {
  const TAG = "Browser";
  const [shadowKey] = useBehaviorSubject(browser?.activeShadowKey$);
  const isCurrentBrowser = browser?.isCurrentBrowser();
  const isPasskeyBound = !!shadowKey;

  const [authUser] = useBehaviorSubject(authUser$);
  const browserFeature = authUser?.get("browser");

  const { showSuccessToast, showErrorToast } = useToast();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleCloseDialog = async (isAgree: boolean): Promise<void> => {
    setOpenConfirmDialog(false);
    if (!isAgree) return;

    let isSuccess = false;
    try {
      isSuccess = await browserFeature.deleteBrowser(browser.id);
    } catch (error) {
      logger.error(TAG, error);
    }
    if (isSuccess) {
      showSuccessToast("Browser has been deleted!");
    } else {
      showErrorToast("Failed to delete the browser...");
    }
  };

  const onDeleteClicked = async (
    event: MouseEvent,
    browser: Browser
  ): Promise<void> => {
    event.stopPropagation(); // Prevent event propagation to the cell
    event.preventDefault(); //

    setOpenConfirmDialog(true);
  };

  return (
    <>
      <CardStyled className="inline-block">
        <div className="relative z-10 inline-flex gap-5 px-3 py-5">
          <ReactIcon icon="ic:round-computer" fontSize={40} />
          <div className="flex flex-col flex-1">
            <Typography variant="body2" fontWeight={600}>{browser.name}</Typography>
            <Typography variant="caption" fontStyle="italic">Last used: {browser.lastUsedAt.toLocaleString()}</Typography>
          </div>
          <div className="flex flex-col">
            {isCurrentBrowser ? (
              <Box className="rounded-[4px] text-[7pt] px-3 py-0.5 inline-block text-white whitespace-nowrap bg-[#9291A5]">
                CURRENT
              </Box>
            ) : (
              <div className="text-right">
                <IconButton
                  aria-label="delete"
                  onClick={(e): Promise<void> => onDeleteClicked(e, browser)}
                >
                  <DeleteIcon style={{ color: "red" }} />
                </IconButton>
              </div>
            )}
            {isPasskeyBound && (
              <div
                className="flex flex-row gap-2 items-center text-white px-4 py-1 rounded-lg text-sm"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                <FingerprintIcon height={30} color="#44CC44" />
                Bound to passkey
              </div>
            )}
          </div>
        </div>
      </CardStyled>
      <ComfirmDialog
        title="Delete this Browser?"
        content="Do you want to delete this Browser?"
        open={openConfirmDialog}
        onClose={handleCloseDialog}
      />
    </>
  );
};
