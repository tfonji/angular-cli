/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import type { ApplicationRef, Type, ɵConsole } from '@angular/core';
import type { renderApplication, renderModule, ɵSERVER_CONTEXT } from '@angular/platform-server';
import type { ɵgetRoutesFromAngularRouterConfig } from '@angular/ssr';

export interface MainServerBundleExports {
  /** Standalone application bootstrapping function. */
  default: (() => Promise<ApplicationRef>) | Type<unknown>;
}

export interface RenderUtilsServerBundleExports {
  /** An internal token that allows providing extra information about the server context. */
  ɵSERVER_CONTEXT: typeof ɵSERVER_CONTEXT;

  /** Render an NgModule application. */
  renderModule: typeof renderModule;

  /** Method to render a standalone application. */
  renderApplication: typeof renderApplication;

  /** Method to extract routes from the router config. */
  ɵgetRoutesFromAngularRouterConfig: typeof ɵgetRoutesFromAngularRouterConfig;

  ɵresetCompiledComponents?: () => void;

  /** Angular Console token/class. */
  ɵConsole: typeof ɵConsole;
}
