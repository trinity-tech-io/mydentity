import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Stack } from "@mui/material";
import { CardStyled } from "@/app/(pages)/account/security/components/SecuritySection";
import SkelTheme from "./SkelTheme";

const CredentialItem: FC = () => {
  return (
    <SkelTheme>
      <div className="relative h-full cursor-pointer">
        <CardStyled
          className="h-full"
          elevation={0}
          sx={{
            px: "12px",
            py: "10px",
            display: "grid",
            verticalAlign: "middle",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            overflow="hidden"
            sx={{ height: 42 }}
          >
            <Skeleton
              width={32}
              height={32}
              circle={true}
              containerClassName="leading-none"
            />
            <h4 className="w-full">
              <Skeleton
                containerClassName="leading-tight block"
                count={2}
                height={12}
              />
            </h4>
          </Stack>
        </CardStyled>
      </div>
    </SkelTheme>
  );
};

export default CredentialItem;
