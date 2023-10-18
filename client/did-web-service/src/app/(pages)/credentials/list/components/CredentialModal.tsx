import { FC, memo, useMemo } from "react";
import {
  Fade,
  Modal,
  Backdrop,
  Typography,
  Stack,
  Box,
  ListItemText,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import { Icon as ReactIcon } from "@iconify/react";
import ChipIcon from "@assets/images/chip.svg";
import { CardStyled } from "@/app/(pages)/account/security/components/SecuritySection";
import { IconAvatar } from "@components/feature/DetailLine";
import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import { ProfileFeature } from "@model/regular-identity/features/profile/profile.feature";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from "@model/credential/credential";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 2,
  "&:focus-visible": {
    outline: "unset",
  },
  ".swiper-button": {
    display: "flex",
    position: "absolute",
    top: "calc(50% - 12px)",
    zIndex: 10,
    cursor: "pointer",
  },
  ".swiper-button svg": {
    width: "1.5rem",
    height: "1.5rem",
  },
  ".image-swiper-button-prev": {
    left: 5,
  },
  ".image-swiper-button-next": {
    right: 5,
  },
  ".swiper-button-disabled": {
    opacity: 0.5,
    pointerEvents: "none",
  },
};

const ListItemTextStyled: FC<{ primary: string; secondary: string }> = ({
  primary,
  secondary,
}) => {
  return (
    <ListItemText
      primary={primary}
      secondary={secondary}
      primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
      secondaryTypographyProps={{ fontSize: 11 }}
    />
  );
};

const SubAccordion: FC<{ subfield: { [key: string]: string } }> = memo(
  ({ subfield }) => {
    return (
      <Accordion className="w-full" sx={{ boxShadow: "unset" }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            p: 0,
            minHeight: "auto !important",
            ".MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded": { my: 0.5 },
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            SUBFIELD
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense sx={{ p: 0, ".MuiListItemText-root": { margin: 0 } }}>
            {Object.keys(subfield).map((key) => (
              <ListItem>
                <ListItemTextStyled
                  primary={key.toUpperCase()}
                  secondary={subfield[key]}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  }
);
interface CredentialModalType {
  credentials?: Array<Credential>;
  identityProfile: ProfileFeature;
  open: boolean;
  onClose: () => void;
}
const CredentialModal: FC<CredentialModalType> = (props) => {
  const { open, identityProfile, onClose } = props;
  const [activeCredential] = useBehaviorSubject(
    identityProfile?.activeCredential$
  );
  const contentTree = activeCredential?.getContentTree();
  const [issuerInfo] = useBehaviorSubject(activeCredential?.issuerInfo$);
  const valueItems = activeCredential?.getValueItems();
  console.log(activeCredential?.getContentTree(), 999);
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="credentials"
      aria-describedby="credential-slider"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
      <Fade in={open}>
        <CardStyled sx={style} elevation={0}>
          <div className="inline-flex items-center pb-2">
            <IconAvatar sx={{ width: 32, height: 32 }}>
              <div className="w-4 h-4 flex justify-center">
                <ChipIcon />
              </div>
            </IconAvatar>
            <Typography variant="body1" fontWeight={600} className="pl-2">
              Credentials
            </Typography>
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <ReactIcon icon="icon-park-outline:left-c" />
          </div>
          <div className="swiper-button image-swiper-button-next">
            <ReactIcon icon="icon-park-outline:right-c" />
          </div>
          <Swiper
            effect={"creative"}
            grabCursor={true}
            modules={[Keyboard, Pagination, Navigation]}
            className="mySwiper w-full"
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            pagination={{
              type: "fraction",
            }}
            keyboard={{
              enabled: true,
            }}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
            // onTransitionEnd={handleTransitionEnd}
            // onSwiper={setSwiper}
          >
            <SwiperSlide className="box-border">
              <Box className="p-1">
                <Stack
                  direction="row"
                  spacing={1}
                  flexGrow={1}
                  alignItems="center"
                  overflow="hidden"
                >
                  <CredentialAvatar
                    credential={activeCredential}
                    width={24}
                    height={24}
                  />
                  <Typography
                    flexGrow={1}
                    variant="body2"
                    fontWeight={600}
                    noWrap={true}
                  >
                    {activeCredential?.getDisplayableTitle()}
                  </Typography>
                </Stack>
                <List
                  dense
                  sx={{ pl: 2, ".MuiListItemText-root": { margin: 0 } }}
                >
                  {valueItems?.map((item) =>
                    item.name.toLowerCase() === "subfield" ? (
                      contentTree["subField"] && (
                        <ListItem>
                          <SubAccordion subfield={contentTree["subField"]} />
                        </ListItem>
                      )
                    ) : (
                      <ListItem>
                        <ListItemTextStyled
                          primary={item.name.toUpperCase()}
                          secondary={item.value}
                        />
                      </ListItem>
                    )
                  )}
                  <ListItem>
                    <ListItemTextStyled
                      primary="ISSUANCE DATE"
                      secondary={activeCredential?.verifiableCredential.issuanceDate.toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemTextStyled
                      primary="EXPIRATION DATE"
                      secondary={activeCredential?.verifiableCredential.expirationDate.toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemTextStyled
                      primary="CREATED BY"
                      secondary={issuerInfo?.name}
                    />
                  </ListItem>
                </List>
              </Box>
            </SwiperSlide>
          </Swiper>
        </CardStyled>
      </Fade>
    </Modal>
  );
};
export default memo(CredentialModal);
