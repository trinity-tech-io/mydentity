import { FileDownloadExecutable } from "@elastosfoundation/hive-js-sdk";
import { Identity } from "@model/identity/identity";
import { configService } from "@services/config/config.service";
import { getScriptingService } from "@services/hive/hive.service";
import { logger } from "@services/logger";
import { compressImage, fileToDataUrlImage } from "@utils/pictures";

type UploadedHiveAvatar = {
  mimeType: string;
  avatarHiveURL: string;
}

export async function editAvatarOnHive(identity: Identity, newPictureFile: File): Promise<UploadedHiveAvatar> {
  // TODO: ensure vault ready

  // TODO: we probably need to delete older pictures from the vault somewhere...
  // But not that easy because we need to keep both the local and published avatars.

  // Upload the the picture and create the script to let others get this picture.
  const randomPictureID = new Date().getTime();
  const mimeType = newPictureFile.type;
  const avatarFileName = "identity/avatar/" + randomPictureID;
  const dataUrl = await fileToDataUrlImage(newPictureFile);
  const compressedImageBuffer = await compressImage(dataUrl, 300);
  const avatarData = compressedImageBuffer; //Buffer.from(compressedImageBuffer, "base64"); // Raw picture data, not base64 encoded

  // Upload the picture
  const vault = await identity.get("hive").getVaultService();
  const uploadResponse = await vault.getFilesService().upload(avatarFileName, Buffer.from(avatarData), { onProgress: () => { } }, false);
  logger.log('profile', "Completed avatar upload to hive", uploadResponse);

  // Create a script to make this picture available to everyone
  const scriptName = "getMainIdentityAvatar" + randomPictureID;
  const scriptingService = await getScriptingService(identity.did);
  await scriptingService.registerScript(scriptName, new FileDownloadExecutable(scriptName, avatarFileName).setOutput(true), undefined, true, true);

  // Prepare the hive url that will be used to fetch the picture
  const appDid = configService.get("appDid");
  const avatarHiveURL = "hive://" + identity.did + "@" + appDid + "/" + scriptName + "?params={}"; // Fake params to prevent hive SDK bug crash
  logger.log("identity", "Generated avatar url:", avatarHiveURL);

  return { mimeType, avatarHiveURL }

  /*  catch (e) {
Logger.error("identity", "Error while saving the avatar", e);
let message = '';
let reworkedEx = DIDHelper.reworkedPluginException(e);
if (reworkedEx instanceof HiveInsufficientSpaceException) {
  message = "identity.save-avatar-error-insufficient-space";
} else if (reworkedEx instanceof NetworkException) {
  message = "common.network-or-server-error";
} else {
  message = e.message;
} */
}