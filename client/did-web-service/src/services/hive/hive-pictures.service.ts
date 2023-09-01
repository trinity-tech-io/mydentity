import { getVault } from "./hive.service";

/**
 * Calls a hive script that contains a downloadable picture file, for instance a identity avatar.
 * The fetched picture is returned as a raw buffer.
 *
 * Ex: hive://user_did@app_did/getMainIdentityAvatar ---> âPNGIHDR...
 */
export const fetchHiveScriptPicture = async (hiveScriptUrl, did) => {
  // DIRTY HACK START - delete this after a while. Reason: Essentials 2.1 android generates invalid script urls such as
  // ...&params={empty:0} // invalid json. - should be &params={\"empty\"":0}. DELETE this hack after a while.
  hiveScriptUrl = hiveScriptUrl.replace('params={empty:0}', 'params={"empty":0}');
  // DIRTY HACK END

  try {
    console.log('GlobalHiveService', 'Calling script url to download file', hiveScriptUrl);
    const pictureBuffer = await (await getVault(did))
      .getScriptingService()
      .downloadFileByHiveUrl(hiveScriptUrl);

    if (!pictureBuffer || pictureBuffer.length === 0) {
      console.warn(
        'GlobalHiveService',
        'Got empty data while fetching hive script picture',
        hiveScriptUrl
      );
      return null;
    }
    console.log(
      'GlobalHiveService',
      'Got data after fetching hive script picture',
      hiveScriptUrl,
      'data length:',
      pictureBuffer.length
    );
    return pictureBuffer;
  } catch (e) {
    // Can't download the asset
    console.warn('GlobalHiveService', 'Failed to download hive asset at ', hiveScriptUrl, e);
    return null;
  }
};
