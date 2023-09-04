import { logger } from "@services/logger";
import { rawImageToBase64DataUrl } from "@utils/pictures";
import { getHiveVault } from "./hive.service";

/**
 * Calls a hive script that contains a downloadable picture file, for instance a identity avatar.
 * The fetched picture is returned as a raw buffer.
 *
 * Ex: hive://user_did@app_did/getMainIdentityAvatar ---> âPNGIHDR...
 */
export const fetchHiveScriptPicture = async (hiveScriptUrl: string, did: string): Promise<Buffer> => {
  // DIRTY HACK START - delete this after a while. Reason: Essentials 2.1 android generates invalid script urls such as
  // ...&params={empty:0} // invalid json. - should be &params={\"empty\"":0}. DELETE this hack after a while.
  hiveScriptUrl = hiveScriptUrl.replace('params={empty:0}', 'params={"empty":0}');
  // DIRTY HACK END

  try {
    logger.log('hive', 'Calling script url to download file', hiveScriptUrl);

    const vault = await getHiveVault(did);

    const pictureBuffer = await vault.getScriptingService().downloadFileByHiveUrl(hiveScriptUrl);
    if (!pictureBuffer || pictureBuffer.length === 0) {
      logger.warn('hive', 'Got empty data while fetching hive script picture', hiveScriptUrl);
      return null;
    }

    logger.log('hive', 'Got data after fetching hive script picture', hiveScriptUrl, 'data length:', pictureBuffer.length);

    return pictureBuffer;
  } catch (e) {
    // Can't download the asset
    logger.warn('hive', 'Failed to download hive asset at ', hiveScriptUrl, e);
    return null;
  }
};

/**
 * Calls a hive script that contains a downloadable picture file, for instance a identity avatar.
 * The fetched picture is returned as a data URL "data:xxx" directly usable with Img HTML elements.
 *
 * Ex: hive://user_did@app_did/getMainIdentityAvatar ---> "data:image/png;base64,iVe89...."
 */
export const fetchHiveScriptPictureToDataUrl = async (hiveScriptUrl: string, did: string): Promise<string> => {
  if (!hiveScriptUrl)
    return null;

  const rawPicture = await fetchHiveScriptPicture(hiveScriptUrl, did);
  return rawPicture ? rawImageToBase64DataUrl(rawPicture) : '';
};
