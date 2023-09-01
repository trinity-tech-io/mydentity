import { rawImageToBase64DataUrl } from '@utils/pictures';
import { BrowserConnectivitySDKHiveAuthHelper } from './BrowserConnectivitySDKHiveAuthHelper';
import { config } from './config';
import { fetchHiveScriptPicture } from './hive-pictures.service';

export const getVault = async (did) => {
  try {
    const instBCSHAH = new BrowserConnectivitySDKHiveAuthHelper(config.DIDResolverUrl);
    const vault = await instBCSHAH.getVaultServices(did);
    return vault;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

/**
 * Calls a hive script that contains a downloadable picture file, for instance a identity avatar.
 * The fetched picture is returned as a data URL "data:xxx" directly usable with Img HTML elements.
 *
 * Ex: hive://user_did@app_did/getMainIdentityAvatar ---> "data:image/png;base64,iVe89...."
 */
export const fetchHiveScriptPictureToDataUrl = async (hiveScriptUrl, did) => {
  if (!hiveScriptUrl) return null;
  return new Promise((resolve) => {
    fetchHiveScriptPicture(hiveScriptUrl, did).then((rawPicture) => {
      if (!rawPicture) resolve('');
      else resolve(rawImageToBase64DataUrl(rawPicture));
    });
  });
};
