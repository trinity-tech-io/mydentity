'use client';
import React, { FC, MouseEvent } from 'react';

interface UserSelectionModalProps {
  users: { credentialId: string, name: string }[];
  onSelectUser: (user: { credentialId: string; name: string }) => void;
  onClose: () => void;
  showCloseButton: boolean;
}

export const UserSelectionModal: FC<UserSelectionModalProps> = ({ users, onSelectUser, onClose, showCloseButton }) => {
  const handleModalClick = (event: MouseEvent): void => {
    // Prevent closing the modal when clicking inside the modal.
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      onClick={onClose}
    >
      <div className="bg-black bg-opacity-90 max-w-96 p-4 rounded-lg shadow-lg border border-gray-300 absolute right-4 top-4" onClick={handleModalClick}>
        <h2 className="text-xl font-semibold mb-2 text-white">Select User</h2>
        <ul className="divide-y divide-gray-300">
          {users.map((user) => (
            <li
              key={user.name}
              onClick={(): void => onSelectUser(user)}
              className="cursor-pointer py-2 hover:bg-gray-400"
            >
              <span className="white">{user.name}</span>
            </li>
          ))}
        </ul>
        {showCloseButton && <button className="absolute top-2 right-2" onClick={onClose}>Close</button>}
      </div>
    </div>
  );
};

