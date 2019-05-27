import { Permissions } from 'expo';

export async function checkAndAskPersmissionsFor(...permissionType: Permissions.PermissionType[]) {
  const permission = await Permissions.getAsync(...permissionType);
  if (permission.status !== 'granted') {
    const newPermission = await Permissions.askAsync(...permissionType);
    if (newPermission.status === 'granted') {
      return true;
    }

    return false;
  }

  return true;
}
