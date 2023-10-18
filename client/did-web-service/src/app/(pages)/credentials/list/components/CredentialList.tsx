"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { Box, List, ListItemButton, Modal, Backdrop } from "@mui/material";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";

import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import CredentialBasicInfo from "@components/credential/CredentialBasicInfo";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Credential } from "@model/credential/credential";
import { activeIdentity$ } from "@services/identity/identity.events";
import { filterCredentials } from "./FilterConditions";
import CredentialBox from "./CredentialBox";
import CredentialModal from "./CredentialModal";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const CredentialListWidget: FC<{
  openedDetail: boolean;
  selectedFilter: string;
}> = ({ openedDetail, selectedFilter }) => {
  const TAG = "CredentialList";
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [credentials] = useBehaviorSubject(
    activeIdentity?.credentials().credentials$
  );
  const mounted = useMounted();
  const identityProfileFeature = activeIdentity?.profile();
  const [activeCredential] = useBehaviorSubject(
    identityProfileFeature?.activeCredential$
  );
  const [filteredCredentials, setFilteredCredentials] = useState<Credential[]>(
    []
  );
  const [expandedIDs, setExpandedIDs] = useState<string[]>([]);
  const [openCredentialModal, setOpenCredentialModal] = useState(false);
  const GRID_COLS: { [key: string]: number } = {
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2,
  };

  const handleListItemClick = (credential: Credential): void => {
    identityProfileFeature.setActiveCredential(credential);
    setOpenCredentialModal(true);
  };

  useEffect(() => {
    if (credentials && !activeCredential) {
      identityProfileFeature.setActiveCredential(credentials[0]);
    }
  }, [activeCredential, credentials]);

  useEffect(() => {
    // Refresh: When filter conditions change or credentials change
    if (credentials) {
      const filtered = filterCredentials(
        selectedFilter,
        credentials,
        activeIdentity
      );
      identityProfileFeature.setActiveCredential(filtered[0] || null);
      setFilteredCredentials(filtered);
    }
  }, [credentials, selectedFilter, activeIdentity]);

  useEffect(() => {
    if (filteredCredentials.length)
      setExpandedIDs((_) =>
        openedDetail ? filteredCredentials.map((c) => c.id) : []
      );
  }, [openedDetail, filteredCredentials]);

  const generateLayouts = useCallback(() => {
    const layouts: { [key: string]: Layout[] } = {};
    Object.keys(GRID_COLS).map((breakpoint) => {
      layouts[breakpoint] = filteredCredentials.map((c, _id) => ({
        i: c.id,
        x: (_id * 2) % GRID_COLS[breakpoint],
        y: Math.floor((_id * 2) / GRID_COLS[breakpoint]),
        w: 2,
        h: expandedIDs.includes(c.id) ? 3 : 1,
      }));
    });
    return layouts;
  }, [expandedIDs, filteredCredentials]);
  return (
    <div className="col-span-full">
      <ResponsiveReactGridLayout
        containerPadding={[0, 0]}
        margin={[16, 16]}
        className="layout mb-2"
        isDraggable={false}
        isResizable={false}
        layouts={generateLayouts()}
        cols={GRID_COLS}
        rowHeight={62}
        breakpoint=""
      >
        {mounted &&
          filteredCredentials &&
          filteredCredentials.map((c) => (
            <Box key={c.id}>
              <CredentialBox
                id={c.id}
                credential={c}
                expanded={expandedIDs.includes(c.id)}
                setExpanded={setExpandedIDs}
                onClick={handleListItemClick}
              />
            </Box>
          ))}
      </ResponsiveReactGridLayout>
      <CredentialModal
        open={openCredentialModal}
        identityProfile={identityProfileFeature}
        onClose={() => setOpenCredentialModal(false)}
      />
      {/* <Modal
        open={openCredentialModal}
        onClose={() => setOpenCredentialModal(false)}
        closeAfterTransition
        aria-labelledby="credentials"
        aria-describedby="credential-slider"
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
          },
        }}
      >
        <Fade in={open}></Fade>
        <Box>
          <span>aaa</span>
        </Box>
      </Modal> */}
      {/* <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        {(!filteredCredentials || !mounted) && <VerticalStackLoadingCard />}
        {mounted && filteredCredentials && (
          <List component="nav" aria-label="main mailbox folders">
            {filteredCredentials.map((c) => (
              <div key={c.id}>
                <ListItemButton
                  selected={activeCredential && activeCredential.id === c.id}
                  onClick={(): void => handleListItemClick(c)}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={{ marginRight: 10 }}>
                    <CredentialAvatar credential={c} width={60} height={60} />
                  </div>
                  <CredentialBasicInfo credential={c} />
                </ListItemButton>
              </div>
            ))}
          </List>
        )}
      </Box> */}
    </div>
  );
};
