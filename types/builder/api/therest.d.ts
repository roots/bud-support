/**
 * Debug mode
 */
type debug = any;
/**
 * Debug mode
 * @typedef {func.<debug>} debug
 * @param   {boolean}      enabled - true to enable debug mode
 * @return  {typeof import('./../index')} TouchList
 */
declare function debug(debug: any): typeof import('./../index');
/**
 * Development mode
 */
type dev = any;
/**
 * Development mode
 * @typedef {func.<dev>}   dev
 * @param   {Object}       options
 * @return  {typeof import('./../index')} TouchList
 */
declare function dev(options: any): typeof import('./../index');
/**
 * Set maxChunks for code splitting
 */
type maxChunks = any;
/**
 * Set maxChunks for code splitting
 * @typedef {func.<maxChunks>} maxChunks
 * @param   {number|string}    chunkCount - maximum number of chunks. default: 'Infinity'.
 * @return  {typeof import('./../index')}     TouchList
 */
declare function maxChunks(chunkCount: number | string): typeof import('./../index');
/**
 * Enable or disable code splitting.
 *
 * @param  {bool} [true]  enabled
 * @return {typeof import('./../index')} TouchList
 */
declare function splitting(enabled: any): typeof import('./../index');
/**
 * Watch mode timeout
 */
type watchTimeout = any;
/**
 * Watch mode timeout
 * @typedef {func.<watchTimeout} watchTimeout
 * @param   {number}             timeout - in ms
 * @return  {typeof import('./../index')}       TouchList
 */
declare function watchTimeout(timeout: number): typeof import('./../index');
//# sourceMappingURL=therest.d.ts.map