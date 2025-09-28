import { DefineComponent, Ref } from 'vue';

import { Alert, AlertButton, AlertOption } from '../bases.js';



/** 生成一个没有横杠`-`的UUID */
export function makeUUID(): string;


/** 取消标志 */
export const symbolCancel: unique symbol;

/** 当前未完成的提示 */
export const $alerts: Ref<Alert[]>;


/** 基础提示 */
export function $show(content: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;

/** 提示 */
export function $alert(content?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;
/** 警告 */
export function $warn(content?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;

/** 询问 */
export function $quest(content?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;
/** 询问（可取消） */
export function $quest3(content?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;

/** 成功 */
export function $okay(action?: string, next?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;
/** 失败 */
export function $fail(action?: string, next?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;



/** 提示组件：提示/询问内容 */
declare const AppAert: DefineComponent<{}, {}>;


export default AppAert;
