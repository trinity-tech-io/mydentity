import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
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
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { Icon as ReactIcon } from "@iconify/react";
import ChipIcon from "@assets/images/chip.svg";
import { CardStyled } from "@/app/(pages)/account/security/components/SecuritySection";
import { IconAvatar } from "@components/feature/DetailLine";
import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import { ProfileFeature } from "@model/regular-identity/features/profile/profile.feature";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from "@model/credential/credential";
import SharedCountLabel from "@components/credential/SharedCountLabel";

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
  ".swiper-pagination": {
    bottom: 0,
    transform: "translateX(-50%) translateY(50%)",
    width: "auto",
    left: "50%",
    backdropFilter: "blur(5px)",
    fontWeight: 600,
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

const CredentialSliderContent: FC<{ credential: Credential }> = memo(
  ({ credential }) => {
    const [requestingApplications] = useBehaviorSubject(
      credential?.requestingApplications$
    );
    const [isConform] = useBehaviorSubject(credential?.isConform$);
    const [issuerInfo] = useBehaviorSubject(credential?.issuerInfo$);
    const contentTree = credential?.getContentTree();
    const valueItems = credential?.getValueItems();
    return (
      <Box className="p-1 relative">
        <Stack
          direction="row"
          spacing={1}
          flexGrow={1}
          alignItems="center"
          overflow="hidden"
        >
          <CredentialAvatar credential={credential} width={24} height={24} />
          <Typography
            flexGrow={1}
            variant="body2"
            fontWeight={600}
            noWrap={true}
          >
            {credential?.getDisplayableTitle()}
          </Typography>
        </Stack>
        <List dense sx={{ pl: 2, ".MuiListItemText-root": { margin: 0 } }}>
          {valueItems?.map((item, _id) =>
            item.name.toLowerCase() === "subfield" ? (
              contentTree["subField"] && (
                <ListItem key={_id}>
                  <SubAccordion subfield={contentTree["subField"]} />
                </ListItem>
              )
            ) : (
              <ListItem key={_id}>
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
              secondary={credential?.verifiableCredential.issuanceDate.toLocaleString()}
            />
          </ListItem>
          <ListItem>
            <ListItemTextStyled
              primary="EXPIRATION DATE"
              secondary={credential?.verifiableCredential.expirationDate.toLocaleString()}
            />
          </ListItem>
          <ListItem>
            <ListItemTextStyled
              primary="CREATED BY"
              secondary={issuerInfo?.name}
            />
          </ListItem>
        </List>
        <div className="inline-flex absolute bottom-0 right-0">
          <SharedCountLabel
            count={requestingApplications?.length || 0}
            isConform={isConform}
          />
        </div>
      </Box>
    );
  }
);
CredentialSliderContent.displayName = "CredentialSliderContent";

const SubAccordion: FC<{ subfield: { [key: string]: string } }> = memo(
  ({ subfield }) => {
    return (
      <Accordion className="w-full" sx={{ boxShadow: "unset" }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            p: 0,
            minHeight: "auto !important",
            ".MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded":
              { my: 0.5 },
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            SUBFIELD
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense sx={{ p: 0, ".MuiListItemText-root": { margin: 0 } }}>
            {Object.keys(subfield).map((key, _id) => (
              <ListItem key={_id}>
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
SubAccordion.displayName = "SubDetailAccordion";
interface CredentialModalType {
  credentials: Array<Credential>;
  identityProfile: ProfileFeature;
  open: boolean;
  onClose: () => void;
}
const CredentialModal: FC<CredentialModalType> = (props) => {
  const { open, identityProfile, credentials, onClose } = props;
  const [swiper, setSwiper] = useState<SwiperClass>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCredential] = useBehaviorSubject(
    identityProfile?.activeCredential$
  );
  const slideTo = (index: number) => {
    swiper?.slideTo(index, 100);
  };

  useEffect(() => {
    if (credentials && activeCredential && !swiper?.destroyed) {
      let activeCredentialIndex = credentials?.findIndex(
        (c) => c.id == activeCredential.id
      );
      if (activeCredentialIndex < 0) activeCredentialIndex = activeIndex;

      if (activeIndex != activeCredentialIndex) slideTo(activeCredentialIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials, activeCredential, swiper]);

  const handleTransitionEnd = (sw: SwiperClass) => {
    setActiveIndex(sw.activeIndex);
  };

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
            initialSlide={activeIndex}
            effect={"creative"}
            grabCursor={true}
            autoHeight={true}
            modules={[Keyboard, Pagination, Navigation]}
            className="mySwiper w-full"
            spaceBetween={20}
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
            onTransitionEnd={handleTransitionEnd}
            onSwiper={setSwiper}
            style={{ overflowY: "visible" }}
          >
            {credentials?.map((c) => (
              <SwiperSlide key={c.id} className="box-border">
                <CredentialSliderContent credential={c} />
              </SwiperSlide>
            ))}
          </Swiper>
        </CardStyled>
      </Fade>
    </Modal>
  );
};
export default memo(CredentialModal);
