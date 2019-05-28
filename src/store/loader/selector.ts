export const getLoading = (state: StoreShape) => state.loading;

export const isLoading = (table: string, key: string | number) => (state: StoreShape) => {
  const contents = getLoading(state)[table];
  return contents && contents.indexOf(key) > -1;
}
