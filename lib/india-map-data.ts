// Simplified India state SVG paths (web mercator, viewBox 612x760).
// Boundaries: 28 states + UTs incl. Telangana, Ladakh, J&K, Dadra & Nagar Haveli and Daman & Diu (merged).
// Source: udit-001/india-maps-data district geojson, dissolved per state (polygon-clipping) + simplified.
// Lakshadweep rendered as a marker (real islands too small at this scale).
//
// Raw path geometry lives in ./india-map.json — edit that file to tweak shapes.
import mapData from './india-map.json';

export type IndiaMap = {
  width: number;
  height: number;
  states: Record<string, string>;
};

export const INDIA_MAP: IndiaMap = mapData;
