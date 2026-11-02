import {
  ALLOWED_SHARED_SEGMENTS,
  ALLOWED_SLICE_SEGMENTS,
  FEATURE_SLICED_LAYERS,
  SLICED_LAYERS,
  type SlicedLayer,
} from '../../shared/project-layout';
import type { ConventionViolation } from '../shared/convention-violation';

const CONVENTION_DOC = '005-feature-sliced-layers.md';
const WEB_ROOT_ENTRIES = new Set<string>([
  ...FEATURE_SLICED_LAYERS,
  'public',
  'components.json',
  'next.config.ts',
  'next-env.d.ts',
  'package.json',
  'postcss.config.mjs',
  'tsconfig.json',
]);
const SERVER_ROOT_ENTRIES = new Set([
  'index.ts',
  'lib',
  'routers',
  'package.json',
  'tsconfig.json',
]);

function violation(filePath: string, message: string): ConventionViolation {
  return { conventionDoc: CONVENTION_DOC, filePath, message };
}

function checkSlicedLayer(layer: SlicedLayer, projectFiles: readonly string[]) {
  const layerFiles = projectFiles.filter((filePath) => filePath.startsWith(`web/${layer}/`));
  const sliceNames = new Set(layerFiles.map((filePath) => filePath.split('/')[2] ?? ''));
  return [...sliceNames].flatMap((sliceName) => {
    const sliceRoot = `web/${layer}/${sliceName}`;
    const sliceFiles = layerFiles.filter((filePath) => filePath.startsWith(`${sliceRoot}/`));
    const missingPublicApi = sliceFiles.includes(`${sliceRoot}/index.ts`)
      ? []
      : [violation(`${sliceRoot}/`, 'every slice exposes a public API in index.ts')];
    const allowedSegments = ALLOWED_SLICE_SEGMENTS[layer];
    const strayEntries = sliceFiles
      .filter((filePath) => {
        const isPublicApi = filePath === `${sliceRoot}/index.ts`;
        return !isPublicApi && !allowedSegments.includes(filePath.split('/')[3] ?? '');
      })
      .map((filePath) =>
        violation(
          filePath,
          `${layer} slices only contain index.ts and: ${allowedSegments.join(', ')}`,
        ),
      );
    return [...missingPublicApi, ...strayEntries];
  });
}

function checkEntitiesHaveNoUi(projectFiles: readonly string[]) {
  return projectFiles
    .filter((filePath) => filePath.startsWith('web/entities/') && filePath.endsWith('.tsx'))
    .map((filePath) => violation(filePath, 'entities are business logic and render no UI'));
}

function checkTopLevelEntries(projectFiles: readonly string[]) {
  return projectFiles.flatMap((filePath) => {
    const [rootFolder, topLevelEntry = '', sharedSegment = ''] = filePath.split('/');
    if (rootFolder === 'web' && !WEB_ROOT_ENTRIES.has(topLevelEntry)) {
      return [violation(filePath, 'web code belongs to a feature-sliced layer')];
    }
    const isUnknownSharedSegment =
      rootFolder === 'web' &&
      topLevelEntry === 'shared' &&
      !(ALLOWED_SHARED_SEGMENTS as readonly string[]).includes(sharedSegment);
    if (isUnknownSharedSegment) {
      return [violation(filePath, `shared only contains: ${ALLOWED_SHARED_SEGMENTS.join(', ')}`)];
    }
    if (rootFolder === 'server' && !SERVER_ROOT_ENTRIES.has(topLevelEntry)) {
      return [violation(filePath, 'server code lives in routers/ or lib/')];
    }
    return [];
  });
}

// Slices expose index.ts, keep to their allowed segments, and entities stay UI-free.
export function checkSliceStructure(projectFiles: readonly string[]): ConventionViolation[] {
  return [
    ...SLICED_LAYERS.flatMap((layer) => checkSlicedLayer(layer, projectFiles)),
    ...checkEntitiesHaveNoUi(projectFiles),
    ...checkTopLevelEntries(projectFiles),
  ];
}
