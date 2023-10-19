import React, { FC } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { useToast } from "@services/feedback.service";

interface CopyButtonTypes {
  text: string;
  iconWidth?: number | string;
}

const CopyButton: FC<CopyButtonTypes> = ({ text, iconWidth = "17px" }) => {
  const { showSuccessToast } = useToast();
  const onCopy = (): void => {
    showSuccessToast("Copied to clipboard");
  };
  return (
    <CopyToClipboard text={text} onCopy={onCopy}>
      <IconButton
        type="button"
        sx={{ p: "5px" }}
        aria-label="link"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Icon icon="material-symbols:content-copy-rounded" width={iconWidth} />
      </IconButton>
    </CopyToClipboard>
  );
};

export default CopyButton;
