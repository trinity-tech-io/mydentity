import { logger } from "@services/logger";
import { ObjectCache } from "@utils/object-cache";
import { rawImageToBase64DataUrl } from "@utils/pictures";
import { BehaviorSubject } from "rxjs";
import { getHiveVault } from "./hive.service";

const dataUrlPictureCache = new ObjectCache<BehaviorSubject<string>>();

/**
 * Returns a subject that contains the latest version of a data url hive script picture.
 * For example, credential issuers avatar pictures.
 *
 * Those subjects are queued and cached in momery so that hive is called only once even
 * if the UI calls the get method often at once.
 */
export function getHiveScriptPictureDataUrl(hiveScriptUrl: string, did: string): Promise<BehaviorSubject<string>> {
  return dataUrlPictureCache.get(hiveScriptUrl + did, {
    async create() {
      return new BehaviorSubject<string>(null);
    },
    async fill(subject: BehaviorSubject<string>) {
      const dataUrl = await fetchHiveScriptPictureToDataUrl(hiveScriptUrl, did);
      subject.next(dataUrl);
    },
  });
}

/**
 * Calls a hive script that contains a downloadable picture file, for instance a identity avatar.
 * The fetched picture is returned as a raw buffer.
 *
 * Ex: hive://user_did@app_did/getMainIdentityAvatar ---> âPNGIHDR...
 */
async function fetchHiveScriptPicture(hiveScriptUrl: string, did: string): Promise<Buffer> {
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
}

/**
 * Calls a hive script that contains a downloadable picture file, for instance a identity avatar.
 * The fetched picture is returned as a data URL "data:xxx" directly usable with Img HTML elements.
 *
 * Ex: hive://user_did@app_did/getMainIdentityAvatar ---> "data:image/png;base64,iVe89...."
 */
async function fetchHiveScriptPictureToDataUrl(hiveScriptUrl: string, did: string): Promise<string> {
  if (!hiveScriptUrl)
    return null;

  const rawPicture = await fetchHiveScriptPicture(hiveScriptUrl, did);
  return rawPicture ? rawImageToBase64DataUrl(rawPicture) : '';
}