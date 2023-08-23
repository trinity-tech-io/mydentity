import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { TextField } from '@mui/material';
import { identityService } from '@services/identity/identity.service';
import { authUser$ } from '@services/user/user.events';
import { useEffect, useRef } from 'react';
import Transition from './Transition';

function ModalCreateIdentity({
  id,
  modalOpen,
  setModalOpen
}) {
  const modalContent = useRef(null);
  const nameInput = useRef(null);

  const [authUser] = useBehaviorSubject(authUser$());

  const createIdentity = async (name) => {
    const identity = await authUser.get("identity").createIdentity(name);
    identityService.setActiveIdentity(identity)
  }

  const deleteDIDTest = async () => {
    // TODO: User select did
    const didStringToDelete = 'did:elastos:iokyuJYsWprwBPg8EkL5QqyQWGsx159Z8B';
    const ret = await authUser.get("identity").deleteIdentity(didStringToDelete);
    if (ret) {
      // TODO: remove the did from UI
    }
  }

  // const deleteCredentialTest = async () => {
  //   logger.log('modalIdentity', 'deleteCredentialTest');
  //   const credentialProver: CredentialsFeature = activeIdentity.get("credentials");
  //   logger.log('modalIdentity', 'credentialProver', credentialProver);
  //   const ret = await credentialProver.deleteCredential('did:elastos:iqgyGD7FhqnKw2P3ZEDJRxUia1nyg2GNm1#name');
  //   if (ret) {
  //     // TODO: remove the did from UI
  //   }
  // }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalContent.current) return;
      if (!modalOpen || modalContent.current.contains(target)) return
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalOpen && nameInput.current.focus();
  }, [modalOpen]);

  const handleSubmit = (event) => {
    // alert('A name was submitted: ' + nameInput.current.value);
    event.preventDefault();
    createIdentity(nameInput.current.value);
    // deleteDIDTest();
    // deleteCredentialTest()
    setModalOpen(false);
  }

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-300"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        // leave="transition ease-out "
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-300"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out "
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-slate-800 p-4 border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          <form className="border-b border-slate-200 dark:border-slate-700" onSubmit={handleSubmit}>
            <div className="pt-2 pb-2">
              <TextField
                className='w-full'
                label="Remember this identity with a name"
                inputRef={nameInput}
                variant="outlined"
                size="small"
              />
            </div>
          </form>

          <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap" onClick={handleSubmit}>
            <span className="hidden xs:block ml-2">Create this identity</span>
            <svg className="ml-2 w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
          </button>
        </div>
      </Transition>
    </>
  );
}

export default ModalCreateIdentity;