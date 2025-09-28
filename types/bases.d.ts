/** 提示选项 */
export type AlertOption = {
	/** 标题 */
	title?: string;
	/** 颜色 */
	colorTop?: string;
	/** 取消值 */
	cancel?: Symbol;
	/** 按钮顺序 */
	orderButtons?: 'asc' | 'desc';
}

/** 按钮选项 */
export type AlertButton = {
	/** 文本 */
	text: string;
	/** 值 */
	value: any;
	/** 反转按钮 */
	reverse?: boolean;
	/** 取消按钮 */
	cancel?: boolean;
	/** 颜色 */
	color?: string;
}

/** 提示配置 */
export type Alert = {
	/** 唯一标识符 */
	uuid: string;
	/** 内容 */
	content: string;
	/** 选项 */
	option: AlertOption;
	/** 按钮 */
	buttons: AlertButton[];
	/** Promise */
	promise: Promise<any>;
	/** 解决器 */
	resolver: PromiseWithResolvers<any>['resolve'];
}
