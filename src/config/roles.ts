const allRoles = {
  user: [
    'getUsers',
    'getCategories',
    'getProducts',
    'getPreferences',
    'getGroups',
    'getGroupPreference',
    'getProductPreferences',
  ],
  admin: [
    'getUsers',
    'manageUsers',
    'getCategories',
    'manageCategories',
    'getProducts',
    'manageProducts',
    'getPreferences',
    'managePreferences',
    'getGroups',
    'manageGroups',
    'getGroupPreference',
    'manageGroupPreference',
    'getProductPreferences',
    'manageProductPreferences',
  ],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
