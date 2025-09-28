<template>
	<template v-for="alert of $alerts" :key="alert.uuid">
		<dialog ref="alert-dialogs" app-alert
			:uuid="alert.uuid"
			:style="parseTopColorStyle(alert.option.colorTop)"
			:color="parseColorAttr(alert.option.colorTop)">
			<p-title @mousedown.left.prevent="onMoveStart">
				<p-title-text>{{ alert.option.title || '提示' }}</p-title-text>
			</p-title>
			<p-body>
				<p-content>{{ alert.content }}</p-content>
				<p-clicks>
					<template v-for="button, index of alert.buttons" :key="index">
						<p-click v-if="button?.text" :tabindex="1401 + (alert.option.orderButtons == 'desc' ? index : -index)"
							:white="(brop ?? $brop)(button.reverse)"
							:style="parseButtonColorStyle(button.color || alert.option.colorTop, button.colorText)"
							:color="parseColorAttr(button.color || alert.option.colorTop)"
							:autofocus="(brop ?? $brop)(index == (alert.option.orderButtons == 'desc' ? 0 : alert.buttons.length - 1))"
							@click="atClick(alert, button.value)"
							@keydown.enter.space.prevent="atClick(alert, button.value)"
						>{{ button.text }}</p-click>
					</template>
				</p-clicks>
			</p-body>
		</dialog>
	</template>
</template>

<script>
import { nextTick, ref, useTemplateRef } from 'vue';


/** @typedef {import('../bases.d.ts').AlertOption} AlertOption */
/** @typedef {import('../bases.d.ts').AlertButton} AlertButton */
/** @typedef {import('../bases.d.ts').Alert} Alert */



/** 从setup中导入 */
const $$ = { $show() { } };

/** 基础提示 @type {(content: string, option?: AlertOption, ...buttons: AlertButton[]) => Promise} */
export const $show = (...args) => $$.$show(...args);


// 基础函数
const $brop = value => value ? '' : undefined;
/** 生成一个没有横杠`-`的UUID */
export const makeUUID = () => globalThis.window.crypto.randomUUID().replaceAll('-', '');


/** 取消标志 */
export const symbolCancel = Symbol('cancel');

/** @type {import('vue').Ref<Alert[]>} */
export const $alerts = ref([]);


/**
 * 提示
 * @param {string} [content]
 * @param {AlertOption} [option]
 * @param {...AlertButton} buttons
 * @returns {Promise<any>}
 */
export const $alert = (content, option, ...buttons) => $show(content, option, ...(buttons.length ? buttons : [
	{ text: '确定', value: true },
]));
/**
 * 警告
 * @param {string} [content]
 * @param {AlertOption} [option]
 * @param {...AlertButton} buttons
 * @returns {Promise<any>}
 */
export const $warn = (content, option, ...buttons) => $show(content, Object.assign({ title: '注意', colorTop: '$warn' }, option), ...(buttons.length ? buttons : [
	{ text: '确定', value: true },
]));

/**
 * 询问
 * @param {string} [content]
 * @param {AlertOption} [option]
 * @param {...AlertButton} buttons
 * @returns {Promise<any>}
 */
export const $quest = (content, option, ...buttons) => $show(content, Object.assign({ title: '询问' }, option), ...(buttons.length ? buttons : [
	{ text: '是', value: true },
	{ text: '否', value: false, reverse: true },
]));

/**
 * 询问（可取消）
 * @param {string} [content]
 * @param {AlertOption} [option]
 * @param {...AlertButton} buttons
 * @returns {Promise<any>}
 */
export const $quest3 = (content, option, ...buttons) => $show(content, Object.assign({ title: '询问' }, option), ...(buttons.length ? buttons : [
	{ text: '是', value: true },
	{ text: '否', value: false, reverse: true },
	{ cancel: true },
]));


/**
 * 成功
 * @param {string} [action]
 * @param {string} [next]
 * @param {AlertOption} [option]
 * @param {...AlertButton} buttons
 * @returns {Promise<any>}
 */
export const $okay = (action = '操作', next, option, ...buttons) => $quest(
	`${action}成功${next ? `。${next}` : ''}`,
	Object.assign({ title: '成功', colorTop: '$okay' }, option),
	...(buttons.length ? buttons : [
		{ text: '确定', value: true },
	]));

/**
 * 失败
 * @param {string} [action]
 * @param {string} [next]
 * @param {AlertOption} [option]
 * @param {...AlertButton} buttons
 * @returns {Promise<any>}
 */
export const $fail = (action = '操作', next, option, ...buttons) => $quest(
	`${action}失败${next ? `。${next}` : ''}`,
	Object.assign({ title: '失败', colorTop: '$fail' }, option),
	...(buttons.length ? buttons : [
		{ text: '确定', value: true },
	]));
</script>

<script setup>
const parseTopColorStyle = color => color?.startsWith('$') ? false : ({ borderColor: color } ?? false);
const parseButtonColorStyle = (colorBack, colorText) => colorBack?.startsWith('$') ? false : ({ backgroundColor: colorBack, color: colorText ?? false } ?? false);

const parseColorAttr = color => color?.startsWith('$') ? color.replace('$', '').toLowerCase() : null;


/** @type {import('vue').Ref<HTMLDialogElement>} */
const $dialogAlert = ref(null);
/** @type {import('vue').ShallowRef<HTMLDialogElement[]|null>} */
const $dialogs = useTemplateRef('alert-dialogs');



/**
 * @param {string} [content='']
 * @param {AlertOption} [option={}]
 * @param {...AlertButton} buttons
 * @returns {Promise<any>}
 */
const $$show = (content = '', option = {}, ...buttons) => {
	const { promise, resolve } = Promise.withResolvers();

	for(const button of buttons) {
		if(!button.cancel) { continue; }

		button.value = 'value' in button ? button.value : option?.cancel ?? symbolCancel;
		button.reverse = 'reverse' in button ? button.reverse : true;
		button.text = 'text' in button ? button.text : '取消';
	}

	/** @type {Alert} */
	const alert = {
		uuid: makeUUID(),

		content: String(content),

		option,
		buttons: option.orderButtons == 'desc' ? buttons : buttons.toReversed(),

		promise,
		resolver: resolve,
	};
	$alerts.value.push(alert);


	// 递归等待元素
	let depthWait = 0;
	const waitElement = async () => {
		await nextTick();

		const elDialog = $dialogs.value?.find(box => box.getAttribute('uuid') == alert.uuid);

		if(!elDialog) {
			if(depthWait > 5000) { throw Error('等待元素超时'); }

			return waitElement(depthWait++);
		}


		alert.elDialog = elDialog;

		elDialog.addEventListener('cancel', () => atClick(alert, alert.option?.cancel ?? symbolCancel));

		elDialog.showModal();
	};
	waitElement();

	return promise;
};
$$.$show = $$show;


const atClick = (alert, value) => {
	alert.resolver(value);

	alert.elDialog.close();

	$alerts.value.splice($alerts.value.indexOf(alert), 1);
};



let top = 0;
let left = 0;
const onMoveStart = () => {
	const dialog = $dialogAlert.value;

	dialog.style.cursor = 'move';

	const onMouseMove = event => {
		dialog.style.top = `${top += event.movementY}px`;
		dialog.style.left = `${left += event.movementX}px`;
	};
	dialog.addEventListener('mousemove', onMouseMove);


	const onMouseEnd = () => {
		dialog.style.cursor = '';

		dialog.removeEventListener('mousemove', onMouseMove);
		dialog.removeEventListener('mouseup', onMouseEnd);
		dialog.removeEventListener('mouseout', onMouseEnd);
	};
	dialog.addEventListener('mouseup', onMouseEnd);
	dialog.addEventListener('mouseout', onMouseEnd);
};
</script>

<style lang="sass" scoped>
dialog
	@apply fixed p-2 overflow-hidden shadow-2xl rounded-md z-40 outline-none
	@apply border-t-8 border-[var(--main-solid)] bg-[var(--main-back1)]
	@apply min-w-[160px] min-h-[90px]

	&::backdrop
		@apply bg-[var(--gray-comp2-alpha)]

	p-title
		@apply block w-full h-6 select-none

		p-title-text
			@apply inblock elli text-lg leading-6 px-1
	p-body
		@apply block

		p-content
			@apply block w-full m-4 pr-8 text-sm whitespace-pre
		p-clicks
			@apply w-full pt-2 pl-8 flex flex-row-reverse gap-2

		p-click
			@apply px-2 border-2 rounded-sm cursor-pointer text-center select-none elli
			@apply text-[var(--contrast)] bg-[var(--main-solid)] border-[var(--main-solid)]

			&:focus:not([disabled]), &:hover:not([disabled])
				@apply shadow-md filter brightness-110

			&[white]
				@apply text-[var(--main-text)] bg-[var(--main-back)] border-transparent

			&[disabled]
				@apply text-[var(--cTextMainDisabled)] filter brightness-75 select-none cursor-default

		p-click
			@apply inblock min-w-16 h-8 lead-b1-8 px-2 outline-none rounded-md

	&[color=warn]
		@apply border-[var(--warn)]
		p-click
			@apply text-[var(--contrast)] bg-[var(--warn)] border-[var(--warn)]
	&[color=okay]
		@apply border-[var(--okay)]
		p-click
			@apply text-[var(--contrast)] bg-[var(--okay)] border-[var(--okay)]
	&[color=fail]
		@apply border-[var(--fail)]
		p-click
			@apply text-[var(--contrast)] bg-[var(--fail)] border-[var(--fail)]
</style>
