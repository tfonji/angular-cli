import { getGlobalVariable } from './env';
import { ProcessOutput, silentBun, silentNpm, silentPnpm, silentYarn } from './process';

export interface PkgInfo {
  readonly name: string;
  readonly version: string;
  readonly path: string;
}

export function getActivePackageManager(): 'npm' | 'yarn' | 'bun' | 'pnpm' {
  return getGlobalVariable('package-manager');
}

export async function installWorkspacePackages(options?: { force?: boolean }): Promise<void> {
  switch (getActivePackageManager()) {
    case 'npm':
      const npmArgs = ['install'];
      if (options?.force) {
        npmArgs.push('--force');
      }
      await silentNpm(...npmArgs);
      break;
    case 'yarn':
      await silentYarn('install');
      break;
    case 'pnpm':
      await silentPnpm('install');
      break;
    case 'bun':
      await silentBun('install');
      break;
  }
}

export async function installPackage(specifier: string, registry?: string): Promise<ProcessOutput> {
  const registryOption = registry ? [`--registry=${registry}`] : [];
  switch (getActivePackageManager()) {
    case 'npm':
      return silentNpm('install', specifier, ...registryOption);
    case 'yarn':
      return silentYarn('add', specifier, ...registryOption);
    case 'bun':
      return silentBun('add', specifier, ...registryOption);
    case 'pnpm':
      return silentPnpm('add', specifier, ...registryOption);
  }
}

export async function uninstallPackage(name: string): Promise<ProcessOutput> {
  switch (getActivePackageManager()) {
    case 'npm':
      return silentNpm('uninstall', name);
    case 'yarn':
      return silentYarn('remove', name);
    case 'bun':
      return silentBun('remove', name);
    case 'pnpm':
      return silentPnpm('remove', name);
  }
}

export async function setRegistry(useTestRegistry: boolean): Promise<void> {
  const url = useTestRegistry
    ? getGlobalVariable('package-registry')
    : 'https://registry.npmjs.org';

  // Ensure local test registry is used when outside a project
  // Yarn supports both `NPM_CONFIG_REGISTRY` and `YARN_REGISTRY`.
  process.env['NPM_CONFIG_REGISTRY'] = url;
}
