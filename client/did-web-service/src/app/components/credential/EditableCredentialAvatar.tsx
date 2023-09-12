import { Credential } from '@model/credential/credential';
import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { CredentialAvatar } from './CredentialAvatar';

export const EditableCredentialAvatar: FC<{
  credential?: Credential; // Existing credential to use for display, if any (ie: existing avatar credential)
  onFileUpload: (file: File) => void;
  width?: number;
  height?: number;
}> = ({ credential, onFileUpload, width, height }) => {

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    if (acceptedFiles?.length > 0) {
      const handledFile = acceptedFiles[0];
      onFileUpload(handledFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    maxFiles: 1,
    onDrop
  });

  return (
    <div {...getRootProps()} style={{ ...(isDragActive && { opacity: 0.72 }) }} className='cursor-pointer'>
      <input {...getInputProps()} />

      <CredentialAvatar credential={credential} width={width} height={height} />
    </div>
  )
}