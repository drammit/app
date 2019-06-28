export default function distilleryLocation(
  region: StoreRegion,
  country: StoreCountry,
): string {
  return [
    region.isResolved && !region.error && region.value.name,
    country.isResolved && !country.error && country.value.name,
  ]
    .filter(i => !!i)
    .join(', ');
}
