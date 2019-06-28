export default function whiskyName(whisky: StoreWhisky, distillery: StoreDistillery): string {
  if (!whisky.isResolved || whisky.error) return '';
  if (!distillery.isResolved || distillery.error) return '';

  return [distillery.value.name, whisky.value.name, whisky.value.bottlingSerie].join(' ');
}
