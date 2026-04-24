import { useEffect, useState } from 'react';
import { isAdminUser, observeAuthState } from '../services/auth';

function useAuthUser() {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState((nextUser) => {
      setUser(nextUser);
      setIsLoadingUser(false);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    isLoadingUser,
    isAdmin: isAdminUser(user),
  };
}

export default useAuthUser;
