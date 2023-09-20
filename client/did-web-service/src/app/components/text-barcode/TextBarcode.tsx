import { FC } from "react";
import Barcode from "react-barcode";

interface TextBarcodeType {
  value: string;
  text: string;
  height?: number;
  outerClassName?: string;
  textClassName?: string;
}

const TextBarcode: FC<TextBarcodeType> = (props) => {
  const { value, text, height = 35, outerClassName = "", textClassName = "" } = props;
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
      className={["inline-flex flex-col", outerClassName].join(" ").trim()}
    >
      <Barcode value={value} {...BarCodeOptions} height={height} />
      <h5
        className={["text-white h5 stretch", textClassName].join(" ").trim()}
      >
        {text}
      </h5>
    </div>
  );
};

export default TextBarcode;
