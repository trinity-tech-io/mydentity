"use client";
import { FC } from 'react';
// import Help from '../components/DropdownHelp';
// import Notifications from '../components/DropdownNotifications';
import { styled } from '@mui/material';
import { MainButton } from '@components/generic/MainButton';
import { DropdownIdentity } from '@components/layout/DropdownIdentity';
import { DropdownUserProfile } from '@components/layout/DropdownProfile';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { authUser$ } from '@services/user/user.events';
import { useRouter } from 'next/navigation';
// import SearchModal from '../components/ModalSearch';

const HeaderStyled = styled('header')(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#242424' : 'white'
}))
export const Header: FC<{
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}> = ({ sidebarOpen, setSidebarOpen }) => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$);
  const router = useRouter()

  // const [searchModalOpen, setSearchModalOpen] = useState(false);

  const signUp = (): void => {
    router.push("/signup")
  }

  const signIn = (): void => {
    router.push("/signin")
  }

  return (
    <HeaderStyled className="sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e): void => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* User is not signed in */}
            {mounted && !authUser && <>
              <MainButton onClick={signUp} >Sign up</MainButton>
              <MainButton onClick={signIn} >Sign in</MainButton>
            </>}

            {/* User is signed in */}
            {mounted && authUser && <>
              <DropdownIdentity align="right" />
              <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
              <DropdownUserProfile align="right" />
            </>}
          </div>
        </div>
      </div>
    </HeaderStyled>
  );
}


{/* <div>
              <button
                className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ml-3 ${searchModalOpen && 'bg-slate-200'
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchModalOpen(true);
                }}
                aria-controls="search-modal"
              >
                <span className="sr-only">Search</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="fill-current text-slate-500 dark:text-slate-400"
                    d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                  />
                  <path
                    className="fill-current text-slate-400 dark:text-slate-500"
                    d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                  />
                </svg>
              </button>
              <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
            </div> */}
{/* <Notifications align="right" /> */ }
{/* <Help align="right" /> */ }
{/* <ThemeToggle /> */ }
{/*  Divider */ }