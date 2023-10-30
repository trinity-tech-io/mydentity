import { FC, memo } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Card,
  Fade,
  Grid,
  Modal,
  Stack,
  Typography,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { capitalizeFirstLetter } from "@utils/strings";
import ChipIcon from "@assets/images/chip.svg";
import Scrollbar from "@components/scrollbar";

const ModalBody = styled(Card)((theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "calc(100vw - 36px)",
  padding: "16px 24px",
}));

const ButtonBaseStyled = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 8,
  boxShadow: "0 0 0 0 transparent",
  WebkitTransition: "all 0.1s ease-in",
  MozTransition: "all 0.1s ease-in",
  transition: "all 0.1s ease-in",
  padding: 4,
  "&:hover": {
    background: "#77777745",
    boxShadow: "0 0 30px 5px rgb(20 20 20 / 58%)",
    WebkitTransition: "all 0.1s ease-out",
    MozTransition: "all 0.1s ease-out",
    transition: "all 0.1s ease-out",
    "&:before": {
      WebkitAnimation: "sh02 0.3s 0s linear",
      MozAnimation: "sh02 0.3s 0s linear",
      animation: "sh02 0.3s 0s linear",
    },
  },
  "&:before": {
    content: "''",
    display: "block",
    width: 0,
    height: "86%",
    position: "absolute",
    top: "7%",
    left: "0%",
    opacity: 0,
    background: "#fff",
    boxShadow: "0 0 50px 30px #fff",
    WebkitTransform: "skewX(-20deg)",
    MozTransform: "skewX(-20deg)",
    MsTransform: "skewX(-20deg)",
    OTransform: "skewX(-20deg)",
    transform: "skewX(-20deg)",
  },
  "&:active": {
    boxShadow: "0 0 0 0 transparent",
    WebkitTransition: "box-shadow 0.1s ease-in",
    MozTransition: "box-shadow 0.1s ease-in",
    transition: "box-shadow 0.1s ease-in",
  },
  "@keyframes sh02": {
    from: {
      opacity: 0,
      left: "0%",
    },
    "50%": {
      opacity: 1,
    },
    to: {
      opacity: 0,
      left: "100%",
    },
  },
}));

const CredentialItem: FC<{ title: string; onClick: () => void }> = ({
  title,
  onClick,
}) => {
  return (
    <ButtonBaseStyled className="w-full" onClick={onClick}>
      <Stack alignItems="center" spacing={0.5} className="pt-2">
        <div className="relative">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              p: 1,
              color: "primary.dark",
              background: "#8888884d",
            }}
          >
            <ChipIcon />
          </Avatar>
          <Box
            className="rounded-full inline-flex items-center justify-center p-[1px] absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
            sx={{ backgroundColor: "#34A853" }}
          >
            <AddIcon sx={{ color: "white", fontSize: "10pt" }} />
          </Box>
        </div>
        <Typography variant="subtitle2">{title}</Typography>
      </Stack>
    </ButtonBaseStyled>
  );
};

interface CreateCredentialDialog {
  open: boolean;
  onClose: (selectedItem: ProfileCredentialInfo) => void;
  availableItemsForAddition: ProfileCredentialInfo[];
}

const CreateCredentialDialog: FC<CreateCredentialDialog> = ({
  onClose,
  open,
  availableItemsForAddition,
}) => {
  const handleClose = (): void => {
    onClose(null);
  };

  const handleListItemClick = (value: ProfileCredentialInfo): void => {
    onClose(value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
      <Fade in={open}>
        <ModalBody>
          <Typography variant="h5" color="text.primary" sx={{ pb: 2 }}>
            Add Profile Item
          </Typography>
          <Scrollbar
            props={{ autoHeight: true, autoHeightMin: 300, autoHeightMax: 500 }}
          >
            <Grid
              container
              spacing={1}
              columns={{ xs: 8, sm: 10 }}
              sx={{ maxHeight: "calc(100vh - 80px)" }}
            >
              {availableItemsForAddition?.map((addableItem, i) => (
                <Grid item xs={2} key={i}>
                  <CredentialItem
                    title={capitalizeFirstLetter(addableItem.key)}
                    onClick={(): void => handleListItemClick(addableItem)}
                  />
                </Grid>
              ))}
            </Grid>
          </Scrollbar>
        </ModalBody>
      </Fade>
    </Modal>
  );
};

export default memo(CreateCredentialDialog);
