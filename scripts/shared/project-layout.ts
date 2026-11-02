import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Absolute path of the repository root, derived from this file's location.
export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export const FEATURE_SLICED_LAYERS = [
  'app',
  'widgets',
  'features',
  'entities',
  'shared',
  'components',
] as const;
export type FeatureSlicedLayer = (typeof FEATURE_SLICED_LAYERS)[number];

export const SLICED_LAYERS = ['widgets', 'features', 'entities'] as const;
export type SlicedLayer = (typeof SLICED_LAYERS)[number];

// Each layer may import only from the layers listed here.
export const ALLOWED_LAYER_IMPORTS: Record<FeatureSlicedLayer, readonly FeatureSlicedLayer[]> = {
  app: ['widgets', 'features', 'entities', 'shared', 'components'],
  widgets: ['features', 'shared', 'components'],
  features: ['entities', 'shared', 'components'],
  entities: ['shared'],
  shared: ['shared', 'components'],
  components: ['shared', 'components'],
};

// Top-level folders a slice may contain besides its index.ts public API.
export const ALLOWED_SLICE_SEGMENTS: Record<SlicedLayer, readonly string[]> = {
  widgets: ['components', 'hooks'],
  features: ['components', 'hooks', 'lib'],
  entities: ['api', 'model', 'lib'],
};

export const ALLOWED_SHARED_SEGMENTS = ['api', 'config', 'hooks', 'lib', 'styles', 'ui'] as const;

export type ImportRestriction = {
  sourcePrefix: string;
  allowedLayers: readonly FeatureSlicedLayer[];
  reason: string;
};

// Modules that only specific layers may import, on top of the layer table.
export const IMPORT_RESTRICTIONS: readonly ImportRestriction[] = [
  {
    sourcePrefix: '@/shared/api',
    allowedLayers: ['entities', 'app'],
    reason: 'tRPC hooks are business logic, so only entities wrap them',
  },
  {
    sourcePrefix: '@trpc/',
    allowedLayers: ['shared', 'app'],
    reason: 'the tRPC client is wired once in shared/api and served from app/api',
  },
  {
    sourcePrefix: '@tanstack/react-query',
    allowedLayers: ['shared', 'entities'],
    reason: 'server state is owned by entities',
  },
  {
    sourcePrefix: 'zustand',
    allowedLayers: ['entities'],
    reason: 'client business state lives in entity models',
  },
  {
    sourcePrefix: '@bottega/server',
    allowedLayers: ['shared', 'entities', 'app'],
    reason: 'server contracts reach the UI through entities',
  },
];

export const SERVER_PACKAGE_NAME = '@bottega/server';
export const WEB_ALIAS_PREFIX = '@/';

// Folder names whose modules may be imported by many files.
export const SHARED_FOLDER_NAMES = ['shared', 'lib', 'hooks'] as const;
// Whole directories treated as shared, such as shadcn's generated primitives.
export const SHARED_DIRECTORIES = ['web/components'] as const;
export const PUBLIC_API_FILE_NAMES = ['index.ts', 'index.tsx'] as const;

export const HOOKS_FOLDER_NAME = 'hooks';
// shadcn primitives live here; only this folder may use raw elements or import radix-ui.
export const UI_PRIMITIVES_DIRECTORY = 'web/components/ui/';
// Entity tRPC hooks and store hooks are the entity's API, so they stay in api/ and model/.
const HOOK_EXEMPT_PATTERNS = [/^web\/components\/ui\//, /^web\/entities\/[^/]+\/(api|model)\//];

export type WebModuleLocation = {
  layer: FeatureSlicedLayer;
  slice: string | null;
  pathInsideSlice: string;
};

// Converts an absolute path to a repository-relative POSIX path.
export function toRepoPath(absolutePath: string) {
  return path.relative(REPO_ROOT, absolutePath).split(path.sep).join('/');
}

export function isPublicApiFile(filePath: string) {
  return (PUBLIC_API_FILE_NAMES as readonly string[]).includes(path.basename(filePath));
}

export function isInSharedFolder(repoPath: string) {
  const directorySegments = path.posix.dirname(repoPath).split('/');
  const isUnderSharedFolderName = directorySegments.some((segment) =>
    (SHARED_FOLDER_NAMES as readonly string[]).includes(segment),
  );
  return (
    isUnderSharedFolderName ||
    SHARED_DIRECTORIES.some((directory) => repoPath.startsWith(`${directory}/`))
  );
}

export function isInHooksFolder(repoPath: string) {
  return path.posix.dirname(repoPath).split('/').includes(HOOKS_FOLDER_NAME);
}

export function isHookExemptPath(repoPath: string) {
  return HOOK_EXEMPT_PATTERNS.some((pattern) => pattern.test(repoPath));
}

export function isSlicedLayer(layer: FeatureSlicedLayer): layer is SlicedLayer {
  return (SLICED_LAYERS as readonly string[]).includes(layer);
}

function isFeatureSlicedLayer(segment: string | undefined): segment is FeatureSlicedLayer {
  return (FEATURE_SLICED_LAYERS as readonly (string | undefined)[]).includes(segment);
}

// Locates a web module in the layer, slice and segment hierarchy.
export function describeWebModule(repoPath: string): WebModuleLocation | null {
  const [rootFolder, layer, ...rest] = repoPath.split('/');
  if (rootFolder !== 'web' || !isFeatureSlicedLayer(layer)) return null;
  if (!isSlicedLayer(layer)) return { layer, slice: null, pathInsideSlice: rest.join('/') };
  const [slice = null, ...insideSlice] = rest;
  const pathInsideSlice = insideSlice.join('/');
  return {
    layer,
    slice,
    pathInsideSlice: isPublicApiFile(pathInsideSlice) ? '' : pathInsideSlice,
  };
}
