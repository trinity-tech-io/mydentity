
/**
 * Lets user pick a picture from his gallery. The picture is uploaded to the developer's hive vault
 * as the application icon. Then, a hive script is created to make this picture publicly accessible
 * by everyone.
 */
/*  public selectAndUploadAppIconFromLibrary() {
 const options: CameraOptions = {
   quality: 90,
   mediaType: 0,
   correctOrientation: true,
   targetWidth: 256, // Reduce picture size to avoid memory problems
   targetHeight: 256,
   destinationType: 0, // Return as base64 data string
   sourceType: 0, // Pick from photo library
   encodingType: 1 // Return as PNG base64 data
 };

 navigator.camera.getPicture((imageData) => {
   // eslint-disable-next-line @typescript-eslint/no-floating-promises
   this.zone.run(async () => {
     if (imageData) {
       let mimeType = await pictureMimeType(imageData);

       if (["image/png", "image/jpg", "image/jpeg"].indexOf(mimeType) < 0) {
         this.native.genericToast('identity.not-a-valid-picture');
         return;
       }

       await this.uploadAppIconToHive(imageData);

       // Free the memory
       navigator.camera.cleanup(() => { }, (err) => { });
     }
   });
 }, ((err) => {
   Logger.error('developertools', err);
 }), options);
}

 private async uploadAppIconToHive(rawBase64ImageOut: string): Promise < void> {
 this.uploadingIcon = true;

 try {
   // Upload the the picture and create the script to let others get this picture.
   let randomPictureID = new Date().getTime();
   let appIconFileName = "developertools/appicons/" + randomPictureID;
   let avatarData = Buffer.from(rawBase64ImageOut, "base64"); // Raw picture data, not base64 encoded
   let uploadResponse = await this.globalHiveService.getActiveVaultServices().getFilesService().upload(appIconFileName, avatarData, false);
   Logger.log('developertools', "Completed app icon upload to hive", uploadResponse);

   // Create a script to make this picture available to everyone
   let scriptName = "getAppIcon" + randomPictureID;
   let couldCreateScript = await this.globalHiveService.getActiveVaultServices().getScriptingService().registerScript(scriptName, new AggregatedExecutable(
     "appIconDownload",
     [new Executable('download', ExecutableType.FILE_DOWNLOAD, { path: appIconFileName })]
   ), null, true, true);
   Logger.log('developertools', "Could create avatar script?", couldCreateScript);

   let essentialsAppDID = GlobalConfig.ESSENTIALS_APP_DID;
   let avatarHiveURL = "hive://" + DIDSessionsStore.signedInDIDString + "@" + essentialsAppDID + "/" + scriptName + "?params={\"empty\":0}"; // Fake params to prevent hive SDK bug crash
   Logger.log("developertools", "Generated avatar url:", avatarHiveURL);

   // Update UI locally without saving to permanent profile yet.
   this.appIconUrl = avatarHiveURL;
   this.base64iconPath = await rawImageToBase64DataUrl(avatarData);
 }
   catch(e) {
   Logger.error('developertools', 'Failed to upload app icon to hive', e);
   this.native.errToast('developertools.failed-to-upload-picture-to-hive');
 }

   this.uploadingIcon = false;
} */
