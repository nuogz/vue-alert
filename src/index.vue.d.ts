/**
 * @typedef {Object} ButtonInfo
 * @property {string} text
 * @property {any} value
 * @property {boolean} [reverse=true]
 */
/** @type {import('vue').Ref<string>} */
export const title: import('vue').Ref<string>;
/** @type {import('vue').Ref<string>} */
export const content: import('vue').Ref<string>;
export const cancel: import("vue").Ref<number>;
/** @type {import('vue').Ref<ButtonInfo>} */
export const button1: import('vue').Ref<ButtonInfo>;
/** @type {import('vue').Ref<ButtonInfo>} */
export const button2: import('vue').Ref<ButtonInfo>;
/** @type {import('vue').Ref<ButtonInfo>} */
export const button3: import('vue').Ref<ButtonInfo>;
/** @type {import('vue').Ref<string>} */
export const colorTop: import('vue').Ref<string>;
/** @type {import('vue').Ref<boolean>} */
export const show: import('vue').Ref<boolean>;
/** @type {import('vue').Ref<Function>} */
export const waiter: import('vue').Ref<Function>;
export function $alert(content?: string, title?: string, button1?: ButtonInfo, button2?: ButtonInfo, button3?: ButtonInfo, cancel?: number, colorTop?: string): Promise<any>;
export function $quest(content?: string, title?: string, button1?: ButtonInfo, button2?: ButtonInfo, button3?: ButtonInfo, cancel?: number, colorTop?: string): Promise<any>;
export function $quest3(content?: string, title?: string, button1?: ButtonInfo, button2?: ButtonInfo, button3?: ButtonInfo, cancel?: number, colorTop?: string): Promise<any>;
export function $okay(action?: string, title?: string, next?: string, button1?: ButtonInfo, button2?: ButtonInfo, button3?: ButtonInfo, cancel?: number, colorTop?: string): Promise<any>;
export function $fail(action?: string, error?: Error | string, title?: string, button1?: ButtonInfo, button2?: ButtonInfo, button3?: ButtonInfo, cancel?: number, colorTop?: string): Promise<any>;
export function install(app: import('vue').App): Promise<void>;
export type ButtonInfo = {
    text: string;
    value: any;
    reverse?: boolean;
};
