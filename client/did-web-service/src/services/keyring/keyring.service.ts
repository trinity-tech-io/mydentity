/**
 * Service responsible to manage device password and passkey bindings, and crypto operations related to
 * securing the access to user accounts's encrypted information on the server side.
 */

/**
 * Binds the current device to the user account. Binding a device means creating a keypair on the
 * device, either through passkey or in the local storage. The keypair is stored on the client side
 * (server doesn't store it) and used by the server temporarily to generate a shadow copy of the root
 * user account key.
 */
export async function bindDevice() {
  const userAgent = window.navigator.userAgent;
}

/**
 * Binds the main user password to the user account. Binding the user password means creating or replacing
 * the current password shadow key on the server side, in orderto re-encrypt the current user account key.
 */
export async function bindPassword(newPassword: string) {

}