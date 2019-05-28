export const getProfiles = (state: StoreShape) => state.profiles;

export const getProfile = (id: number) => (state: StoreShape) => {
  const profile = getProfiles(state)[id];

  if (typeof profile === 'undefined') {
    console.log('Load', id);
  }

  return profile;
}
