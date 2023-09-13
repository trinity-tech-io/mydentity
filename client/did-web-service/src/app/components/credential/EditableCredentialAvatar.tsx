import { LoadingCircle } from '@components/loading-cards/loading-circle/LoadingCircle';
import { Credential } from '@model/credential/credential';
import clsx from 'clsx';
import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { CredentialAvatar } from './CredentialAvatar';

export const EditableCredentialAvatar: FC<{
  credential?: Credential; // Existing credential to use for display, if any (ie: existing avatar credential)
  onFileUpload: (file: File) => void;
  width?: number;
  height?: number;
  updating?: boolean;
  disabled?: boolean;
}> = ({ credential, onFileUpload, width, height, updating = false, disabled = false }) => {

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    if (disabled)
      return;

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
    <div {...(!disabled && getRootProps())} style={{ ...(isDragActive && { opacity: 0.72 }) }} className={clsx(!disabled && 'cursor-pointer')}>
      {!disabled && <input {...getInputProps()} />}

      <div className='relative'>
        <CredentialAvatar
          credential={credential}
          width={width}
          height={height}
        />
        {updating && <LoadingCircle className='absolute top-0 bottom-0 left-0 right-0' />}
      </div>
    </div>
  )
}