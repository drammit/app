import { Constants } from 'expo';

type EnvKey = 'API_ROOT' | 'STATIC_ROOT';

export function envVar(key: EnvKey) {
  if (!Constants.manifest.extra) return undefined;
  return Constants.manifest.extra[key];
}
