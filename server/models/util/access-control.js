
// Access control functions
export const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);

export const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

export const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

export const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };
