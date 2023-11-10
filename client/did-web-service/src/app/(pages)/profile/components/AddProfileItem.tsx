import { FC, useEffect, useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import EditCredentialDialog, {
  EditionMode,
} from "@components/identity-profile/EditCredentialDialog";
import { DarkButton } from "@components/button";
import CreateCredentialDialog from "@components/identity-profile/CreateCredentialDialog";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { ProfileCredential } from "@model/credential/profile-credential";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useToast } from "@services/feedback.service";
import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { getAvailableProfileEntries } from "@services/identity-profile-info/identity-profile-info.service";
import { logger } from "@services/logger";

interface AddProfileItemType {
  identity: RegularIdentity;
}
const AddProfileItem: FC<AddProfileItemType> = ({ identity }) => {
  const TAG = "AddProfileItem";
  const identityProfileFeature = identity?.profile();
  const [openCreateCredential, setOpenCreateCredential] = useState(false);
  const [openEditCredentialDialog, setOpenEditCredentialDialog] =
    useState(false);
  const [preEditCredentialInfo, setPreEditCredentialInfo] =
    useState<ProfileCredentialInfo>(null);
  const [preEditCredentialValue, setPreEditCredentialValue] =
    useState<string>("");
  const [originCredential, setOriginCredential] =
    useState<ProfileCredential>(null);
  const [availableItemsForAddition, setAvailableItemsForAddition] = useState<
    ProfileCredentialInfo[]
  >([]);
  const [credentials] = useBehaviorSubject(
    identityProfileFeature?.profileCredentials$
  );
  const { showSuccessToast, showErrorToast } = useToast();

  /**
   * Computes the list of available items a user can add to his profile.
   * This list is based on the global list of available profile items, minus the profile items that are
   * already added and that can't be added more than once.
   */
  const computeAvailableItems = (): void => {
    // List of addable profile items (that can produce credentials)
    const availableProfileEntries = getAvailableProfileEntries();
    const availableEntries = availableProfileEntries?.filter((entry) => {
      // Condition to keep the entry available for addition?
      // - Be of kind "multipleInstancesAllowed"
      // - Or not be used by user's credentials yet
      return (
        entry.key.toLowerCase() !== "avatar" &&
        (entry.options.multipleInstancesAllowed ||
          !credentials?.find((c) =>
            c.verifiableCredential.type.includes(entry.type?.getShortType())
          ))
      );
    });

    setAvailableItemsForAddition(availableEntries);
  };

  useEffect(() => {
    computeAvailableItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  const handleCreateCredentialDialogClose = (
    selectedItem: ProfileCredentialInfo
  ): void => {
    setOpenCreateCredential(false);
    if (selectedItem) {
      setOpenEditCredentialDialog(true);
      setPreEditCredentialInfo(selectedItem);
      setPreEditCredentialValue("");
      setOriginCredential(null);
    }
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

    if (editCredentialValue.type == EditionMode.NEW && !originCredential) {
      let isSuccess = false;
      try {
        // Call the API with auto-retry if user unlock method is required.
        isSuccess = !!(await identityProfileFeature.createProfileCredential(
          "",
          editCredentialValue.info.typesForCreation(),
          editCredentialValue.info.key,
          editCredentialValue.value
        ));
      } catch (error) {
        logger.error(TAG, "Create credential error", error);
      }
      showFeedbackToast(
        isSuccess,
        "Entry has been created!",
        "Failed to create the entry..."
      );
    }
  };

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
  return (
    <>
      <DarkButton
        className="rounded"
        size="small"
        startIcon={<AddIcon />}
        disabled={!credentials} // Don't allow edition until credentials are fetched
        onClick={(): void => {
          setOpenCreateCredential(true);
        }}
      >
        ADD PROFILE ITEM
      </DarkButton>

      <CreateCredentialDialog
        open={openCreateCredential}
        onClose={handleCreateCredentialDialogClose}
        availableItemsForAddition={availableItemsForAddition}
      />

      <EditCredentialDialog
        credentialInfo={preEditCredentialInfo}
        defaultValue={preEditCredentialValue}
        type={EditionMode.NEW}
        open={openEditCredentialDialog}
        originCredential={originCredential}
        onClose={handleEditCredentialDialogClose}
      />
    </>
  );
};
export default AddProfileItem;
