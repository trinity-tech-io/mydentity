"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";

import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Credential } from "@model/credential/credential";
import { filterCredentials } from "./FilterConditions";
import CredentialBox from "./CredentialBox";
import CredentialModal from "./CredentialModal";
import { LoadingCredentialBox } from "@components/loading-skeleton";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import ConfirmDialog from "@components/generic/ConfirmDialog";
import EditCredentialDialog, {
  EditionMode,
} from "@components/identity-profile/EditCredentialDialog";
import { useToast } from "@services/feedback.service";
import { logger } from "@services/logger";
import { ProfileCredential } from "@model/credential/profile-credential";
import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const CredentialListWidget: FC<{
  openedDetail: boolean;
  selectedFilter: string;
  stringFilter: string;
  identity: RegularIdentity;
}> = ({ openedDetail, selectedFilter, stringFilter, identity }) => {
  const TAG = "CredentialList";

  const [credentials] = useBehaviorSubject(
    identity?.credentials().credentials$
  );
  const mounted = useMounted();
  const identityProfileFeature = identity?.profile();
  const [activeCredential] = useBehaviorSubject(
    identityProfileFeature?.activeCredential$
  );
  const [filteredCredentials, setFilteredCredentials] =
    useState<Credential[]>(credentials);
  const [expandedIDs, setExpandedIDs] = useState<string[]>([]);
  const [openCredentialModal, setOpenCredentialModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [originCredential, setOriginCredential] =
    useState<ProfileCredential>(null);
  const [preEditCredentialInfo, setPreEditCredentialInfo] =
    useState<ProfileCredentialInfo>(null);
  const [preEditCredentialValue, setPreEditCredentialValue] =
    useState<string>("");
  const [openEditCredentialDialog, setOpenEditCredentialDialog] =
    useState(false);
  const credentialsFeature = identity?.credentials();
  const { showSuccessToast, showErrorToast } = useToast();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCredential, credentials]);

  useEffect(() => {
    // Refresh: When filter conditions change or credentials change
    if (credentials) {
      const filtered = filterCredentials(
        selectedFilter,
        credentials,
        identity
      ).filter((c) =>
        c
          .getDisplayableTitle()
          .toLowerCase()
          .includes(stringFilter.toLowerCase())
      );
      identityProfileFeature.setActiveCredential(filtered[0] || null);
      setFilteredCredentials(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials, selectedFilter, stringFilter, identity]);

  useEffect(() => {
    if (filteredCredentials?.length)
      setExpandedIDs((_) =>
        openedDetail ? filteredCredentials.map((c) => c.id) : []
      );
  }, [openedDetail, filteredCredentials]);

  const generateLayouts = useCallback(() => {
    const layouts: { [key: string]: Layout[] } = {};
    Object.keys(GRID_COLS).forEach((breakpoint) => {
      const arrayData =
        mounted && filteredCredentials
          ? filteredCredentials
          : Array(3)
              .fill(0)
              .map((_, _id) => ({ id: _id.toString() }));
      layouts[breakpoint] = arrayData.map((c, _id) => ({
        i: c.id,
        x: (_id * 2) % GRID_COLS[breakpoint],
        y: Math.floor((_id * 2) / GRID_COLS[breakpoint]),
        w: 2,
        h: expandedIDs.includes(c.id) ? 3 : 1,
      }));
    });
    return layouts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedIDs, filteredCredentials, mounted]);

  const showFeedbackToast = (
    isSuccess: boolean,
    successMessage: string,
    errorMessage: string
  ): void => {
    if (isSuccess) {
      showSuccessToast(successMessage);
    } else {
      showErrorToast(errorMessage);
    }
  };

  const onOpenMenu = (credential: ProfileCredential): void => {
    setOriginCredential(credential);
  };

  const onMenuClickAway = (): void => {
    setOriginCredential(null);
  };

  const onClickDeleteCredential = (): void => {
    setOpenConfirmDialog(true);
  };

  const onClickEditCredential = (): void => {
    setOpenEditCredentialDialog(true);
    const entry = findProfileInfoByTypes(
      originCredential.verifiableCredential.getType()
    );
    setPreEditCredentialInfo(entry);
    // TODO: DONT GET THE PROPERTY LIKE THIS: ASK THE PROFILE FEATURE TO RETURN THE VALUE
    setPreEditCredentialValue(
      originCredential.verifiableCredential.getSubject().getProperty(entry.key)
    );
  };

  const handleEditCredentialDialogClose = async (editCredentialValue: {
    info: ProfileCredentialInfo;
    value: any;
    type: EditionMode;
    originCredential: ProfileCredential;
  }): Promise<void> => {
    setOpenEditCredentialDialog(false);
    if (!editCredentialValue) return;

    if (!editCredentialValue.value) return;

    if (
      editCredentialValue.type == EditionMode.EDIT &&
      editCredentialValue.originCredential
    ) {
      let isSuccess = false;
      try {
        isSuccess = !!(await identityProfileFeature.updateProfileCredential(
          editCredentialValue.originCredential,
          editCredentialValue.value
        ));
      } catch (error) {
        logger.error(TAG, "Update credential error", error);
      }
      showFeedbackToast(
        isSuccess,
        "Entry has been updated!",
        "Failed to update the entry..."
      );
    }
  };

  const handleCloseDialog = async (isAgree: boolean): Promise<void> => {
    setOpenConfirmDialog(false);
    if (!isAgree) return;

    let isSuccess = false;
    try {
      isSuccess = await credentialsFeature.deleteCredential(originCredential);
    } catch (error) {
      logger.error(TAG, error);
    }
    showFeedbackToast(
      isSuccess,
      "Entry has been deleted",
      "Failed to delete the entry..."
    );
  };

  return (
    <div className="col-span-full">
      {mounted && filteredCredentials && !filteredCredentials.length && (
        <Typography variant="body1" align="center" lineHeight={3}>
          {!stringFilter ? (
            "No credential found."
          ) : (
            <>
              No results found for &nbsp;
              <strong>&quot;{stringFilter}&quot;</strong>.
              <br /> Try checking for typos or using complete words.
            </>
          )}
        </Typography>
      )}
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
        style={
          filteredCredentials && !filteredCredentials.length
            ? { height: 0 }
            : {}
        }
      >
        {mounted && filteredCredentials
          ? filteredCredentials.map((c) => (
              <Box key={c.id}>
                <CredentialBox
                  id={c.id}
                  credential={c}
                  expanded={expandedIDs.includes(c.id)}
                  setExpanded={setExpandedIDs}
                  onClick={handleListItemClick}
                  onOpenMenu={onOpenMenu}
                  onMenuClickAway={onMenuClickAway}
                  onClickEdit={onClickEditCredential}
                  onClickDelete={onClickDeleteCredential}
                />
              </Box>
            ))
          : Array(3)
              .fill(0)
              .map((_, _id) => (
                <Box key={_id}>
                  <LoadingCredentialBox key={_id} />
                </Box>
              ))}
      </ResponsiveReactGridLayout>

      <CredentialModal
        open={openCredentialModal}
        credentials={filteredCredentials}
        identityProfile={identityProfileFeature}
        onClose={(): void => {
          setOpenCredentialModal(false);
        }}
      />

      <ConfirmDialog
        title="Delete this Credential?"
        content="Do you want to delete this Credential?"
        open={openConfirmDialog}
        onClose={handleCloseDialog}
      />

      <EditCredentialDialog
        credentialInfo={preEditCredentialInfo}
        defaultValue={preEditCredentialValue}
        type={EditionMode.EDIT}
        open={openEditCredentialDialog}
        originCredential={originCredential}
        onClose={handleEditCredentialDialogClose}
      />
    </div>
  );
};
