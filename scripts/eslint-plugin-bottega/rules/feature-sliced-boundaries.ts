import { resolveSpecifierPath } from '../../shared/module-resolution';
import {
  ALLOWED_LAYER_IMPORTS,
  IMPORT_RESTRICTIONS,
  WEB_ALIAS_PREFIX,
  describeWebModule,
  toRepoPath,
  type WebModuleLocation,
} from '../../shared/project-layout';
import { createRule } from '../shared/create-rule';
import { visitModuleSources } from '../shared/visit-module-sources';

type BoundaryMessageId =
  | 'restrictedImport'
  | 'crossSliceImport'
  | 'useRelativeInsideSlice'
  | 'layerViolation'
  | 'useAliasAcrossSlices'
  | 'deepSliceImport';

type BoundaryVerdict = { messageId: BoundaryMessageId; data: Record<string, string> } | null;

function judgeImport(
  importer: WebModuleLocation,
  target: WebModuleLocation,
  isAliasImport: boolean,
): BoundaryVerdict {
  if (importer.layer === target.layer) {
    if (!importer.slice) return null;
    if (importer.slice === target.slice) {
      return isAliasImport ? { messageId: 'useRelativeInsideSlice', data: {} } : null;
    }
    return {
      messageId: 'crossSliceImport',
      data: { layer: importer.layer, targetSlice: target.slice ?? '' },
    };
  }
  if (!ALLOWED_LAYER_IMPORTS[importer.layer].includes(target.layer)) {
    const allowedLayers = ALLOWED_LAYER_IMPORTS[importer.layer].join(', ');
    return {
      messageId: 'layerViolation',
      data: { layer: importer.layer, targetLayer: target.layer, allowedLayers },
    };
  }
  if (!isAliasImport) return { messageId: 'useAliasAcrossSlices', data: {} };
  if (target.slice && target.pathInsideSlice !== '') {
    return {
      messageId: 'deepSliceImport',
      data: { publicApi: `@/${target.layer}/${target.slice}` },
    };
  }
  return null;
}

export const featureSlicedBoundaries = createRule({
  name: 'feature-sliced-boundaries',
  meta: {
    type: 'problem',
    docs: { description: 'Web modules respect feature-sliced layer and slice boundaries.' },
    schema: [],
    messages: {
      restrictedImport: 'The {{layer}} layer may not import "{{specifier}}": {{reason}}.',
      crossSliceImport:
        '{{layer}} cannot import other {{layer}} (found "{{targetSlice}}"). Compose them one layer up, or move the shared part down a layer.',
      useRelativeInsideSlice: 'Inside a slice, import with a relative path instead of "@/".',
      layerViolation:
        '{{layer}} cannot import from {{targetLayer}}. {{layer}} may only import from: {{allowedLayers}}.',
      useAliasAcrossSlices: 'Import other layers with the "@/" alias, not a relative path.',
      deepSliceImport: 'Import through the slice\'s public API "{{publicApi}}", not its internals.',
    },
  },
  defaultOptions: [],
  create(context) {
    const importer = describeWebModule(toRepoPath(context.filename));
    if (!importer) return {};
    return visitModuleSources(({ node, specifier }) => {
      const restriction = IMPORT_RESTRICTIONS.find(({ sourcePrefix }) =>
        specifier.startsWith(sourcePrefix),
      );
      if (restriction && !restriction.allowedLayers.includes(importer.layer)) {
        const messageData = { layer: importer.layer, specifier, reason: restriction.reason };
        context.report({ node, messageId: 'restrictedImport', data: messageData });
        return;
      }
      const targetPath = resolveSpecifierPath(context.filename, specifier);
      const target = targetPath ? describeWebModule(toRepoPath(targetPath)) : null;
      if (!target) return;
      const verdict = judgeImport(importer, target, specifier.startsWith(WEB_ALIAS_PREFIX));
      if (verdict) context.report({ node, ...verdict });
    });
  },
});
