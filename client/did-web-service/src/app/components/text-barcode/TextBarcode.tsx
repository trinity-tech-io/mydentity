import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FC } from "react";
import Barcode from "react-barcode";
import clsx from 'clsx';

interface TextBarcodeType {
  value: string;
  text: string;
  height?: number;
  outerClassName?: string;
  textClassName?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  stretch: {
    textAlign: 'justify',
    '&:after': {
      content: "''",
      width: '100%',
      display: 'inline-block'
    }
  },
}));

const TextBarcode: FC<TextBarcodeType> = (props) => {
  const { value, text, height = 35, outerClassName = "", textClassName = "" } = props;
  const classes = useStyles();
  const BarCodeOptions = {
    displayValue: false,
    margin: 0,
    background: "#ffffffff00",
    lineColor: "#ffffff",
    height: 35,
    width: 1.3,
  };

  return (
    <div
      className={clsx('inline-flex flex-col', outerClassName)}
    >
      <Barcode value={value} {...BarCodeOptions} height={height} />
      <h5
        className={clsx('text-white h5', classes.stretch, textClassName)}
      >
        {text}
      </h5>
    </div>
  );
};

export default TextBarcode;
