import { FC, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { generateTheme } from "@/app/theming/material-ui.theme";
import { CopyButton } from "@components/button";

const MnemonicBox: FC<{ mnemonic: string }> = ({ mnemonic }) => {
  const [showKey, setShowKey] = useState(false);
  const lightTheme = generateTheme("light");

  const handleClickShowKey: React.MouseEventHandler = () =>
    setShowKey((show) => !show);

  return (
    <ThemeProvider theme={lightTheme}>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <Box className="p-4 pb-2">
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle1">MNEMONICS</Typography>
              <div className="inline-flex gap-1 ml-auto">
                <IconButton
                  size="small"
                  aria-label="toggle key visibility"
                  onClick={handleClickShowKey}
                  color="primary"
                  // onMouseDown={handleMouseDownButton}
                >
                  {showKey ? (
                    <VisibilityOff sx={{ fontSize: 18 }} />
                  ) : (
                    <Visibility sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
                <CopyButton text={mnemonic} iconWidth={18} />
              </div>
            </Stack>
            <div className="rounded-md bg-[#8888884a] p-2">
              <Typography
                variant="body2"
                color="text.primary"
                textAlign="center"
                fontFamily={!showKey && "Redacted Script"}
              >
                {mnemonic}
              </Typography>
            </div>
          </Stack>
          <Typography variant="caption" color="error">
            Reminder: Please store the mnemonics in a secure place
          </Typography>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default MnemonicBox;
