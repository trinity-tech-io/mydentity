import { useEffect, useRef, useState } from 'react';
import Transition from './Transition';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { authUser$ } from '@services/user/user.events';
import { activeIdentity$ } from '@services/identity/identity.events';
import { Identity } from '@model/identity/identity';

function DropdownIdentity({
  align
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const [authUser] = useBehaviorSubject(authUser$);
  let [identities] = useBehaviorSubject(authUser?.get("identity").identities$);
  let [currentIdentity] = useBehaviorSubject(activeIdentity$);

  const createDIDTest = async () => {
    await authUser.get("identity").createIdentity();
    // alert("Identity successfully created");
  }

  const setCurrentIdentity = (identity: Identity) => {
    activeIdentity$.next(identity)
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {/* <Image className="w-8 h-8 rounded-full" src={IdentityAvatar} width="32" height="32" alt="User" /> */}
        <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{currentIdentity?currentIdentity.did:"Select Identity"}</span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="py-3 px-3 w-full" >
            <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap" onClick={createDIDTest} >
              <span className="hidden xs:block ml-2">Create New DID</span>
              <svg className="ml-2 w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
            </button>
          </div>
                {
                  identities.length>0 ? 
                    <div className="border-b border-slate-200 dark:border-slate-700 " ></div> : <span></span>
                }
                {
                    identities.map(identity => {
                      return (
                        <tr key={identity.did}>
                          <td className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-3 px-3"
                              onClick={()=>{
                                setCurrentIdentity(identity)
                                setDropdownOpen(false)
                              }}>
                            <div className="text-left">{identity.did}</div>
                          </td>
                          {/* <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{identity.createdAt.toLocaleDateString()}</div>
                          </td> */}
                        </tr>
                      )
                    })
                    // "I think that's more than just like it!"
                }
        </div>
      </Transition>
    </div>
  )
}

export default DropdownIdentity;