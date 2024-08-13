/**
 * @typedef {Object} ButtonInfo
 * @property {string} text
 * @property {any} value
 * @property {boolean} [reverse=true]
 * @property {string} [color]
 */
/** @type {import('vue').Ref<string>} */
export const $title: import("vue").Ref<string>;
/** @type {import('vue').Ref<string>} */
export const $content: import("vue").Ref<string>;
export const $cancel: import("vue").Ref<number>;
/** @type {import('vue').Ref<ButtonInfo>} */
export const $button1: import("vue").Ref<ButtonInfo>;
/** @type {import('vue').Ref<ButtonInfo>} */
export const $button2: import("vue").Ref<ButtonInfo>;
/** @type {import('vue').Ref<ButtonInfo>} */
export const $button3: import("vue").Ref<ButtonInfo>;
/** @type {import('vue').Ref<string>} */
export const $colorTop: import("vue").Ref<string>;
/** @type {import('vue').Ref<boolean>} */
export const $showing: import("vue").Ref<boolean>;
/** @type {import('vue').Ref<Function>} */
export const $resolver: import("vue").Ref<Function>;
export function $alert(content?: string | undefined, title?: string | undefined, button1?: ButtonInfo | undefined, button2?: ButtonInfo | undefined, button3?: ButtonInfo | undefined, cancel?: number | undefined, colorTop?: string | undefined): Promise<any>;
export function $quest(content?: string | undefined, title?: string | undefined, button1?: ButtonInfo | undefined, button2?: ButtonInfo | undefined, button3?: ButtonInfo | undefined, cancel?: number | undefined, colorTop?: string | undefined): Promise<any>;
export function $quest3(content?: string | undefined, title?: string | undefined, button1?: ButtonInfo | undefined, button2?: ButtonInfo | undefined, button3?: ButtonInfo | undefined, cancel?: number | undefined, colorTop?: string | undefined): Promise<any>;
export function $okay(action?: string | undefined, title?: string | undefined, next?: string | undefined, button1?: ButtonInfo | undefined, button2?: ButtonInfo | undefined, button3?: ButtonInfo | undefined, cancel?: number | undefined, colorTop?: string | undefined): Promise<any>;
export function $fail(action?: string | undefined, error?: string | Error | undefined, title?: string | undefined, button1?: ButtonInfo | undefined, button2?: ButtonInfo | undefined, button3?: ButtonInfo | undefined, cancel?: number | undefined, colorTop?: string | undefined): Promise<any>;
export function install(app: import("vue").App, idElement: any): Promise<void>;
declare const _default: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
export default _default;

export type ButtonInfo = {
    text: string;
    value: any;
    reverse?: boolean | undefined;
    color?: string | undefined;
};
