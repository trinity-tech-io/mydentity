import { Injectable } from '@nestjs/common';
import { User, UserType } from '@prisma/client';
import { randomUUID } from 'crypto';
import Downloader from 'nodejs-file-downloader';
import * as request from 'request';
// import { FilesService } from '../files/files.service';
import { ThirdPartyUser } from './dto/third-party-user';
// const fs = require('fs');

@Injectable()
export class MicrosoftProfileService {
  // constructor(private readonly filesService: FilesService) {}

  public async retrieveEmail(token: string): Promise<string> {
    // https://learn.microsoft.com/en-us/azure/active-directory/develop/userinfo
    // TODO：
    return null;
  }

  /**
   * Retrieve user avatar picture from microsoft account.
   * @param thirdPartyUser user profiles from microsoft
   * @param user user info. from server side.
   */
  public async retrieveAvatarPicture(
    thirdPartyUser: ThirdPartyUser,
    user: User,
  ) {
    // if (thirdPartyUser.userType !== UserType.MICROSOFT) return;
    //
    // try {
    //   const photoMetadata = await this.getUserPhotoMetadata(
    //     thirdPartyUser.accessToken,
    //   );
    //   const [baseDir, relDir] = [
    //     this.filesService.getUploadingBaseDir(),
    //     this.filesService.getUploadingRelativeDir(),
    //   ];
    //   const mimeType = photoMetadata['@odata.mediaContentType'];
    //   const extension = this.filesService.mimeTypeToExtension(mimeType);
    //   const fileName = extension
    //     ? `${randomUUID()}.${extension}`
    //     : randomUUID();
    //   // console.log('photoMetadata', photoMetadata, typeof photoMetadata, photoMetadata['@odata.mediaContentType'], photoMetadata['id'])
    //   await this.downloadUserPhoto(
    //     thirdPartyUser.accessToken,
    //     `${baseDir}/${relDir}`,
    //     fileName,
    //   );
    //   const file = await this.filesService.addExistingUploadingFile(
    //     user,
    //     relDir,
    //     fileName,
    //     mimeType,
    //     fs.statSync(`${baseDir}/${relDir}/${fileName}`).size,
    //   );
    //   thirdPartyUser.picture = `file://${file.id}`;
    //   // console.log('retrieveAvatarPicture', thirdPartyUser)
    // } catch (e) {
    //   console.log('Failed to get microsoft user photo: ', e);
    // }
  }

  private async getUserPhotoMetadata(accessToken) {
    // https://learn.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#example-3-get-the-metadata-of-the-user-photo-of-the-signed-in-user
    return new Promise((resolve, reject) => {
      const options = {
        url: 'https://graph.microsoft.com/v1.0/me/photo',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log('user photo mime type', body);
          resolve(JSON.parse(body));
        } else {
          console.log(`Failed to get user's photo URL. Error: ${error}`);
          reject(error);
        }
      });
    });
  }

  private async downloadUserPhoto(
    accessToken: string,
    dirPath: string,
    fileName: string,
  ) {
    // https://learn.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#example-1-get-the-photo-for-the-signed-in-user-in-the-largest-available-size
    const downloader = new Downloader({
      url: 'https://graph.microsoft.com/v1.0/me/photo/$value',
      directory: dirPath,
      fileName: fileName,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    await downloader.download();
  }
}
