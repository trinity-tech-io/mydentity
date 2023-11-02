"use client";
import React, { FC, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSearchParams } from "next/navigation";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { useRouter } from "next13-progressbar";
import {
  Card,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { Icon as ReactIcon } from "@iconify/react";
import { CopyButton } from "@components/button";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { authUser$ } from "@services/user/user.events";
import { BrowserRow } from "./components/BrowserRow";
import SecuritySection from "./components/SecuritySection";
import LinkTextfield from "../../developers/components/DidTextfield";
import { useToast } from "@services/feedback.service";

const Security: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$);
  const emailFeature = authUser?.get("email");
  const [userEmails] = useBehaviorSubject(emailFeature?.userEmails$);
  const securityFeature = authUser?.get("security");
  const browserFeature = authUser?.get("browser");
  const [browsers] = useBehaviorSubject(browserFeature?.browsers$);
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$);
  const isPasswordBound = securityFeature?.isPasswordBound();
  const isThisBrowserBound = securityFeature?.isThisBrowserBound();
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [errorMsg, setErrorMsg] = useState(null);

  // Connect external browser box
  const [creatingSignInLink, setCreatingSignInLink] = useState(false);
  const [externalAuthUrl, setExternalAuthUrl] = useState<string>(null);
  const [externalAuthPinCode, setExternalAuthPinCode] = useState<string>(null);
  const [expireTime, setExpireTime] = useState<number>(Date.now());
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    if (error && error !== "") {
      switch (error) {
        case "emailExists":
          setErrorMsg("Email already exists");
          break;
        default:
          setErrorMsg("Unknown error, please try again.");
          break;
      }
    }
  }, [error]);

  const bindDevice = (): void => {
    // securityFeature.bindDevice();
  };

  const bindPasskey = (): void => {
    router.push("/account/security/bind-passkey");
  };

  const bindPassword = (): void => {
    router.push("/account/security/bind-password");
  };

  const bindEmail = (): void => {
    router.push("/account/security/bind-email");
  };

  const unbindEmail = async (id: string): Promise<void> => {
    const success = await authUser.get("email").deleteUserEmail(id);
    if (success) showSuccessToast("Success to unbind email.");
    else showErrorToast("Failed to unbind email.");
  };

  const renderer: CountdownRendererFn = ({ minutes, seconds, completed }) => {
    if (completed) {
      setExternalAuthUrl(null);
      setExternalAuthPinCode(null);
      return null;
    } else {
      return (
        <Typography variant="body2" color="error" textAlign="right">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")} left
        </Typography>
      );
    }
  };

  const createSignInLink = (): void => {
    setCreatingSignInLink(true);
    authUser
      .get("security")
      .requestTemporaryAuthenticationUrl()
      .then((result) => {
        if (result) {
          setExternalAuthUrl(result.url);
          setExternalAuthPinCode(result.pinCode);
          setExpireTime(Date.now() + 1000 * 60 * 10);
        }
        setCreatingSignInLink(false);
      });
  };

  return (
    <div className="col-span-full">
      {/* <Breadcrumbs entries={["security-center"]} /> */}
      <Headline
        title="Security Center"
        description="Many Web3 apps require you to manage complex cryptographic keys, which can sometimes lead to unsafe practices. Our service securely stores some keys
      for you, ensuring your control and security. Link multiple devices for future account recovery."
        showBg={true}
      />
      <Grid container spacing={3}>
        {/* Connect email address box */}
        <Grid item xs={12} md={6}>
          <SecuritySection
            className="h-full"
            icon={<ReactIcon icon="entypo:email" />}
            title="Connect email address"
            statusTitle={`EMAIL ${userEmails?.length ? "" : "NOT "}LINKED`}
            isSet={userEmails?.length && userEmails?.length > 0}
            actionTitle={userEmails?.length ? "BIND MORE" : "VERIFY EMAIL"}
            handleAction={bindEmail}
          >
            {userEmails?.length ? (
              <>
                <Typography variant="body2">
                  Email addresses already bound
                </Typography>
                <div className="flex flex-col mt-2 gap-1">
                  {userEmails.map((email) => (
                    <div
                      key={email.id}
                      className="info flex items-center gap-1"
                    >
                      <Typography
                        variant="body2"
                        color="text.primary"
                        className="break-all"
                      >
                        {email.email}
                      </Typography>
                      <Tooltip title="Unbind email" arrow>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={(): void => {
                            unbindEmail(email.id);
                          }}
                        >
                          <LinkOffIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Typography variant="body2">
                Connecting your email to your account allows you to log in
                later. If you haven't linked an email, you can still log in
                using browser biometrics if it's set up.
              </Typography>
            )}
            {errorMsg && (
              <Typography variant="caption" color="error">
                {errorMsg}
              </Typography>
            )}
          </SecuritySection>
        </Grid>

        {/* Master password box */}
        <Grid item xs={12} md={6}>
          <SecuritySection
            className="h-full"
            icon={<ReactIcon icon="ic:round-password" />}
            title="Set master password"
            statusTitle={`PASSWORD ${isPasswordBound ? "" : "NOT "}SET`}
            isSet={isPasswordBound}
            actionTitle={isPasswordBound ? "UPDATE PASSWORD" : "BIND PASSWORD"}
            handleAction={bindPassword}
          >
            {isPasswordBound ? (
              <Typography variant="body2">
                You've successfully set up your master password, which is like a
                key to your account's security. This important step helps keep
                your account safe and under your control.
              </Typography>
            ) : (
              <Typography variant="body2">
                By defining <b>master password</b>, all your personal
                information stored in our service gets encrypted and can only be
                accessed with your approval. Note that this password can only
                changed if you have another encryption method defined, such as
                the browser biometrics.
              </Typography>
            )}
          </SecuritySection>
        </Grid>

        {/* Passkey box */}
        <Grid item xs={12} md={6}>
          <SecuritySection
            className="h-full"
            icon={<ReactIcon icon="fluent:fingerprint-48-filled" />}
            title="Link browser via biometric passkey"
            statusTitle={`BROWSER ${isThisBrowserBound ? "" : "NOT "}BOUND`}
            isSet={isThisBrowserBound}
            actionTitle={
              isThisBrowserBound ? "BIND AGAIN" : "SECURE BIOMETRICS"
            }
            handleAction={bindPasskey}
          >
            {isThisBrowserBound ? (
              <Typography variant="body2">
                Your browser is bound to your account.
              </Typography>
            ) : (
              <Typography variant="body2">
                When you link your account to your browser's biometrics, you can
                only access this app from that specific browser. It also lets
                you unlock the encryption key, keeping your data safe from
                unauthorized access, even potential attackers.
              </Typography>
            )}
          </SecuritySection>
        </Grid>

        {/* Connect other browser box */}
        <Grid item xs={12} md={6}>
          <SecuritySection
            className="h-full"
            icon={<ReactIcon icon="fluent-mdl2:website" />}
            title="Sign in from another browser"
            actionTitle={"CREATE A SIGN IN LINK"}
            statusTitle={externalAuthUrl ? "LINK CREATED" : null}
            isSet={!!externalAuthUrl || null}
            handleAction={createSignInLink}
            actionInProgress={creatingSignInLink}
          >
            {!externalAuthUrl && (
              <Typography variant="body2">
                You can create a temporary url to sign in from another browser
                on your computer or mobile phone.
              </Typography>
            )}
            {externalAuthUrl && (
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="body2">
                    Send the provided URL to another browser to sign in.
                  </Typography>
                  <Typography variant="body2">
                    When prompted, enter the PIN code{" "}
                    <b>{externalAuthPinCode}</b>. This link is valid for 10
                    minutes.
                  </Typography>
                </Stack>
                <Card
                  variant="outlined"
                  className="p-8 flex justify-center"
                  sx={{ background: "white" }}
                >
                  <QRCode value={externalAuthUrl} />
                </Card>
                <Stack spacing={1}>
                  <LinkTextfield
                    value={externalAuthUrl}
                    outerProps={{ readOnly: true }}
                    inputProps={{
                      className: "opacity-80",
                      style: { fontSize: 12 },
                    }}
                  />
                  <Countdown date={expireTime} renderer={renderer} />
                </Stack>
              </Stack>
            )}
          </SecuritySection>
        </Grid>
      </Grid>
      <div className="">
        <Typography variant="h6" fontWeight={600} className="py-3">
          My Browsers
        </Typography>
        {mounted && (
          <>
            {browsers?.length == 0 && (
              <Typography variant="body2">No browser used so far.</Typography>
            )}
            {browsers && (
              <Grid container spacing={2}>
                {browsers.map((browser, i) => (
                  <Grid item key={i}>
                    <BrowserRow browser={browser} />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Security;
