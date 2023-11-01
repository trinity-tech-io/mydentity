import { FC } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import { TooltipRenderProps } from "react-joyride";

const TourTooltip: FC<TooltipRenderProps> = ({
  backProps,
  continuous,
  index,
  isLastStep,
  primaryProps,
  skipProps,
  step,
  tooltipProps,
}: TooltipRenderProps) => {
  return (
    <Card
      {...tooltipProps}
      // radius="sm"
      sx={{
        background: "linear-gradient(to bottom, #5300bd, #380976)",
        px: 2,
        py: 1,
        maxWidth: 420,
        minWidth: 300,
      }}
    >
      <Box padding="md">
        {step.title && (
          <Typography
            component="div"
            variant="body1"
            className="underline underline-offset-2"
          >
            {step.title}
          </Typography>
        )}
        {step.content && (
          <Typography component="div" variant="body2">
            {step.content}
          </Typography>
        )}
      </Box>
      {!step.hideFooter && (
        <Box className="flex">
          {!isLastStep && (
            <Button
              {...skipProps}
              // size="sm"
            >
              Skip
            </Button>
          )}
          <div className="flex flex-1 justify-end">
            {index > 0 && (
              <Button
                {...backProps}
                // size="sm"
              >
                back
              </Button>
            )}
            <Button
              {...primaryProps}
              // size="sm"
            >
              {continuous ? "next" : "close"}
            </Button>
          </div>
        </Box>
      )}
    </Card>
  );
};

export default TourTooltip;
