// Helper to parse roles from the user object.
export function getRoles(user) {
  if (!user) return [];
  if (user.role) return [user.role];
  return [];
}

export function hasRole(user, role) {
  if (!user || !role) return false;
  const roles = getRoles(user);
  return roles.includes(role);
}
