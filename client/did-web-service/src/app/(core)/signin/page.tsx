import SignIn from "@components/Signin";
import { FC } from "react";
import { useEffect, useRef, useState } from 'react';

const Profile: FC = () => {
  // const [signInOpen, setSignInOpen] = useState(false);

  return (
    <div className="col-span-full">
      <SignIn></SignIn>
    </div>
  )
}

export default Profile;