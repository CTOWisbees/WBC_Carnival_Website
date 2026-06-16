// Merges the per-metric data files into one lookup keyed by state name.
// To change data, edit the individual metric files in this folder — not here.

import { AVG_AGE } from './avg-age';
import { FINANCIAL_LITERACY } from './financial-literacy';
import { STARTUPS } from './startups';
import { URBAN_UNEMPLOYMENT } from './urban-unemployment';
import { RURAL_UNEMPLOYMENT } from './rural-unemployment';

export type StateStat = {
  avgAge?: number;
  finLit?: number;
  startups?: number;
  urbanUnemp?: number;
  ruralUnemp?: number;
};

const SOURCES: Array<[keyof StateStat, Record<string, number>]> = [
  ['avgAge', AVG_AGE],
  ['finLit', FINANCIAL_LITERACY],
  ['startups', STARTUPS],
  ['urbanUnemp', URBAN_UNEMPLOYMENT],
  ['ruralUnemp', RURAL_UNEMPLOYMENT],
];

export const STATE_STATS: Record<string, StateStat> = (() => {
  const out: Record<string, StateStat> = {};
  for (const [field, src] of SOURCES) {
    for (const [state, value] of Object.entries(src)) {
      (out[state] ??= {})[field] = value;
    }
  }
  return out;
})();
