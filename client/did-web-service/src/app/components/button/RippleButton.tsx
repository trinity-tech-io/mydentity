import { FC, MouseEventHandler, ReactNode, useRef } from "react";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { Box } from "@mui/material";
import clsx from "clsx";

const RippleButton: FC<{
  className: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}> = ({ className, children, onClick }) => {
  const rippleRef = useRef(null);
  const onRippleStart: MouseEventHandler<HTMLDivElement> = (e): void => {
    rippleRef.current.start(e);
  };
  const onRippleStop: MouseEventHandler<HTMLDivElement> = (e): void => {
    rippleRef.current.stop(e);
  };
  return (
    <Box
      className={clsx(className, "relative cursor-pointer")}
      onClick={onClick}
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
      sx={{
        borderRadius: "6.5px",
        overflow: "hidden",
        "&:after": {
          background: "#fff",
          content: "''",
          height: 155,
          left: -75,
          opacity: 0.2,
          position: "absolute",
          top: -50,
          width: 50,
          WebkitTransition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
          transition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
          WebkitTransform: "rotate(35deg)",
          MsTransform: "rotate(35deg)",
          transform: "rotate(35deg)",
          zIndex: -10,
        },
        "&:hover": {
          boxShadow: "0px 0px 7px #999999",
          "&:after": {
            left: "120%",
            WebkitTransition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
            transition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
          },
        },
      }}
    >
      {children}
      <TouchRipple ref={rippleRef} center={false} />
    </Box>
  );
};

export default RippleButton;
