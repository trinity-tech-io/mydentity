import { FC } from "react";

const Profile: FC = () => {
  return (<div className="col-span-full">
    Here is the active identity profile. Only information for the active DID is shown. A profile is a user friendly way of displaying a few base credentials such as name, birth date, nationality. Only for VCs with known type.
    <br /><br />
    We want to do like in essentials here: we have a hardcoded list of basic credential types. We can edit those credentials in a UI friendly way (user never sees the credentials) and when a profile entry is edited, this creates a new VC automatically.
    <br /><br />
    Next to each profile entry we should also show a small icon to open the associate credential detail page.
    <br /><br />
    The user avatar should be saved to hive but we need to wait to get the hive service ready for that.
  </div>)
}

export default Profile;