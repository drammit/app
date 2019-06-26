export default function whiskyName(whisky: StoreWhisky, distillery: StoreDistillery): string {
  if (!whisky || whisky instanceof Error) return '';
  if (!distillery || distillery instanceof Error) return '';

  return [distillery.name, whisky.name, whisky.bottlingSerie].join(' ');
}
