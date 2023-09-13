import { Identity } from "@model/identity/identity";
import { activeIdentity$ } from "@services/identity/identity.events";
import { logger } from "@services/logger";
import { PermanentCache } from "@utils/caches/permanent-cache";
import { isClientSide } from "@utils/client-server";
import { rawImageToBase64DataUrl } from "@utils/pictures";


type CacheCustomData = {
  hiveScriptUrl: string;
  identity: Identity;
}

// No indexed db on server, initialize cache only on the client side
const cache = isClientSide() && new PermanentCache<string, CacheCustomData>('hive-pictures', async (key, customData) => {
  logger.log("hive", "Cache miss for hive url picture, fetching");
  return fetchHiveScriptPictureToDataUrl(customData.hiveScriptUrl, customData.identity);
});

/**
 * Returns a cached data url hive script picture.
 * For example, credential issuers avatar pictures.
 */
export function getHiveScriptPictureDataUrl(hiveScriptUrl: string): Promise<string> {
  // NOTE: This method is supposed to allow anonymous access to hive script pictures but for now it doesn't,
  // and it requires an identity to generate the hive authentication. So we use the active identity
  const identity = activeIdentity$.value;
  if (!identity)
    return null;

  // The cache will queue requests to avoid fetching multiple times in case of concurrent access to the same resource.
  return cache.get(hiveScriptUrl + identity.did, { hiveScriptUrl, identity });
}

/**
 * Calls a hive script that contains a downloadable picture file, for instance a identity avatar.
 * The fetched picture is returned as a data URL "data:xxx" directly usable with Img HTML elements.
 *
 * Ex: hive://user_did@app_did/getMainIdentityAvatar ---> "data:image/png;base64,iVe89...."
 */
async function fetchHiveScriptPictureToDataUrl(hiveScriptUrl: string, identity: Identity): Promise<string> {
  if (!hiveScriptUrl)
    return null;

  const rawPicture = await fetchHiveScriptPicture(hiveScriptUrl, identity);
  return rawPicture ? rawImageToBase64DataUrl(rawPicture) : '';
}

/**
 * Calls a hive script that contains a downloadable picture file, for instance a identity avatar.
 * The fetched picture is returned as a raw buffer.
 *
 * Ex: hive://user_did@app_did/getMainIdentityAvatar ---> âPNGIHDR...
 */
async function fetchHiveScriptPicture(hiveScriptUrl: string, identity: Identity): Promise<Buffer> {
  // DIRTY HACK START - delete this after a while. Reason: Essentials 2.1 android generates invalid script urls such as
  // ...&params={empty:0} // invalid json. - should be &params={\"empty\"":0}. DELETE this hack after a while.
  hiveScriptUrl = hiveScriptUrl.replace('params={empty:0}', 'params={"empty":0}');
  // DIRTY HACK END

  try {
    logger.log('hive', 'Calling script url to download file', hiveScriptUrl);

    const vault = await identity.get("hive").getVaultService();

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