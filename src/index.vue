<template>
	<comp-mask v-show="showMask" />
	<comp-alert v-show="show" ref="win"
		:style="{
			top: top + 'px',
			left: left + 'px',
			borderColor: styleColorTop,
		}"
		:color="attrColorTop"
	>
		<p-title
			:style="{ cursor: moving ? 'move' : 'default' }"
			@mousemove="onMouseMove" @mousedown="onMoveStart" @mouseup="onMoveEnd" @mouseout="onMoveEnd"
		>
			<p-title-text>{{ title || '提示' }}</p-title-text>
		</p-title>
		<p-body>
			<p-body-content>{{ content || '' }}</p-body-content>
			<p-body-clicks>
				<Click v-if="button3 && button3.text" tabindex="1403" :white="brop(button3.reverse)"
					:text="button3.text" :color="parseAttrColor(button3.color)"
					@click="atClick(button3.value)"
					@keydown.enter.space.prevent="atClick(button3.value)"
					@keydown.esc.prevent="atClick(button1.value, true)"
				/>
				<Click v-if="button2 && button2.text" tabindex="1402" :white="brop(button2.reverse)"
					:text="button2.text" :color="parseAttrColor(button2.color)"
					@click="atClick(button2.value)"
					@keydown.enter.space.prevent="atClick(button2.value)"
					@keydown.esc.prevent="atClick(button1.value, true)"
				/>
				<Click v-if="button1 && button1.text" tabindex="1401" :white="brop(button1.reverse)"
					:text="button1.text" :color="parseAttrColor(button1.color)"
					@click="atClick(button1.value)"
					@keydown.enter.space.prevent="atClick(button1.value)"
					@keydown.esc.prevent="atClick(button1.value, true)"
				/>
			</p-body-clicks>
		</p-body>
	</comp-alert>
</template>

<script>
	import { computed, createApp, ref, watch } from 'vue';

	import { brop } from '@nuogz/utility';
	import { Click } from '@nuogz/vue-components';

	import componentSelf from './index.vue';



	/**
	 * @typedef {Object} ButtonInfo
	 * @property {string} text
	 * @property {any} value
	 * @property {boolean} [reverse=true]
	 * @property {string} [color]
	 */

	/** @type {import('vue').Ref<string>} */
	export const title = ref('');
	/** @type {import('vue').Ref<string>} */
	export const content = ref('');

	export const cancel = ref(0);
	/** @type {import('vue').Ref<ButtonInfo>} */
	export const button1 = ref({ text: '', value: null, reverse: true });
	/** @type {import('vue').Ref<ButtonInfo>} */
	export const button2 = ref({ text: '', value: null, reverse: true });
	/** @type {import('vue').Ref<ButtonInfo>} */
	export const button3 = ref({ text: '', value: null, reverse: true });

	/** @type {import('vue').Ref<string>} */
	export const colorTop = ref(null);

	/** @type {import('vue').Ref<boolean>} */
	export const show = ref(false);
	/** @type {import('vue').Ref<Function>} */
	export const waiter = ref(null);


	/**
	 * @param {string} [$content='']
	 * @param {string} [$title='']
	 * @param {number} [$cancel=0]
	 * @param {ButtonInfo} [$button1]
	 * @param {ButtonInfo} [$button2]
	 * @param {ButtonInfo} [$button3]
	 * @param {string} [$colorTop]
	 */
	const showBox = ($content = '', $title = '', $cancel = 0, $button1 = {}, $button2 = {}, $button3 = {}, $colorTop) => {
		title.value = String($title);
		content.value = String($content);

		button1.value = $button1;
		button2.value = $button2;
		button3.value = $button3;
		cancel.value = $cancel;

		colorTop.value = $colorTop;

		return new Promise(resolve => {
			waiter.value = resolve;
			show.value = true;
		});
	};

	/**
	 * @param {string} [content='']
	 * @param {string} [title='提示']
	 * @param {ButtonInfo} [button1={ text: '确定', value: true }]
	 * @param {ButtonInfo} [button2]
	 * @param {ButtonInfo} [button3]
	 * @param {number} [cancel=1]
	 * @param {string} [colorTop]
	 */
	export const $alert = (content, title = '提示',
		button1 = { text: '确定', value: true },
		button2,
		button3,
		cancel = 1,
		colorTop
	) => {
		return showBox(content, title, cancel, button1, button2, button3, colorTop);
	};


	/**
	 * @param {string} [content='']
	 * @param {string} [title='提示']
	 * @param {ButtonInfo} [button1={ text: '是', value: true }]
	 * @param {ButtonInfo} [button2={ text: '否', value: false, reverse: true }]
	 * @param {ButtonInfo} [button3]
	 * @param {number} [cancel=2]
	 * @param {string} [colorTop]
	 */
	export const $quest = (content, title = '提示',
		button1 = { text: '是', value: true },
		button2 = { text: '否', value: false, reverse: true },
		button3,
		cancel = 2,
		colorTop
	) => {
		return showBox(content, title, cancel, button1, button2, button3, colorTop);
	};


	/**
	 * @param {string} [content='']
	 * @param {string} [title='提示']
	 * @param {ButtonInfo} [button1={ text: '是', value: true }]
	 * @param {ButtonInfo} [button2={ text: '否', value: false, }]
	 * @param {ButtonInfo} [button3={ text: '取消', value: 'cancel', reverse: true }]
	 * @param {number} [cancel=3]
	 * @param {string} [colorTop]
	 */
	export const $quest3 = (content, title = '提示',
		button1 = { text: '是', value: true },
		button2 = { text: '否', value: false, },
		button3 = { text: '取消', value: 'cancel', reverse: true },
		cancel = 3,
		colorTop
	) => {
		return showBox(content, title, cancel, button1, button2, button3, colorTop);
	};


	/**
	 * @param {string} [action='操作']
	 * @param {string} [title='成功']
	 * @param {string} [next]
	 * @param {ButtonInfo} [button1={ text: '确定', value: true }]
	 * @param {ButtonInfo} [button2]
	 * @param {ButtonInfo} [button3]
	 * @param {number} [cancel=0]
	 * @param {string} [colorTop='$okay']
	 */
	export const $okay = (action = '操作', title = '成功', next, button1 = { text: '确定', value: true }, button2, button3, cancel = 0, colorTop = '$okay') => {
		const content = `${action}成功${next ? `。${next}` : ''}`;

		return showBox(content, title, cancel, button1, button2, button3, colorTop);
	};

	/**
	 * @param {string} [action='操作']
	 * @param {string} [title='失败']
	 * @param {Error|string} [error]
	 * @param {ButtonInfo} [button1={ text: '确定', value: true }]
	 * @param {ButtonInfo} [button2]
	 * @param {ButtonInfo} [button3]
	 * @param {number} [cancel=0]
	 * @param {string} [colorTop='$fail']
	 */
	export const $fail = (action = '操作', error, title = '失败', button1 = { text: '确定', value: true }, button2, button3, cancel = 0, colorTop = '$fail') => {
		const content = (`${action}失败，原因：${error?.message ?? error ?? '未知'}`);

		return showBox(content, title, cancel, button1, button2, button3, colorTop);
	};


	/**
	 * @param {import('vue').App} app
	 * @returns {Promise<void>}
	 */
	export const install = async app => {
		const appAlert = createApp(componentSelf);

		const domAlert = document.createElement('div');
		domAlert.id = 'alert';

		appAlert.mixin({ data() { return { brop }; } });

		document.body.appendChild(domAlert);
		appAlert.mount(domAlert);
	};
</script>

<script setup>
	import './index.pcss';



	const moving = ref(false);
	const top = ref(0);
	const left = ref(0);


	const styleColorTop = computed(() => colorTop.value?.startsWith('$') ? false : (colorTop.value ?? false));

	const parseAttrColor = color => color?.startsWith('$') ? color.replace('$', '').toLowerCase() : null;
	const attrColorTop = computed(() => parseAttrColor(colorTop.value));




	const showMask = ref(false);


	const win = ref(null);


	watch(show, now => {
		if(now) {
			setTimeout(() => {
				top.value = (window.innerHeight - win.value.clientHeight) / 2;
				left.value = (window.innerWidth - win.value.clientWidth) / 2;

				setTimeout(() => win.value.querySelector('comp-click:last-child').focus(), 0);
			}, 0);

			showMask.value = true;
		}
	});


	const atClick = (value, fromCancel = false) => {
		if(fromCancel) {
			if(!cancel.value) { return; }
			else if(cancel.value == 1) { value = button1.value; }
			else if(cancel.value == 2) { value = button2.value; }
			else if(cancel.value == 3) { value = button3.value; }
		}


		title.value = null;
		content.value = null;

		cancel.value = 0;
		button1.value = { text: null, value: null, reverse: true };
		button2.value = { text: null, value: null, reverse: true };
		button3.value = { text: null, value: null, reverse: true };

		show.value = false;
		showMask.value = false;

		if(typeof waiter.value == 'function') {
			try {
				waiter.value(value);
			}
			finally {
				waiter.value = null;
			}
		}
	};

	const onMouseMove = e => {
		if(e.buttons == 1) {
			top.value += e.movementY;
			left.value += e.movementX;
		}
	};
	const onMoveStart = () => moving.value = true;
	const onMoveEnd = () => moving.value = false;
</script>

<style lang="sass" scoped>
comp-mask
	@apply fixed top-0 bottom-0 left-0 right-0 z-30
	background: #0000001a

comp-alert
	@apply fixed p-2 overflow-hidden shadow-2xl rounded-sm z-40 border-t-8 border-[var(--cMain)]
	min-width: 160px
	min-height: 90px
	background-color: color-mix(in srgb, var(--cBack) 90%, white)

	&[color=okay]
		@apply border-[var(--cOkay)]
	&[color=fail]
		@apply border-[var(--cFail)]

	p-title
		@apply block w-full h-6 select-none

		p-title-text
			@apply inblock elli text-lg leading-6 px-1

	p-body
		@apply block

		p-body-content
			@apply block w-full m-4 pr-8 text-sm

		p-body-clicks
			@apply w-full pt-2 pl-8 flex flex-row-reverse gap-2


		comp-click
			@apply inblock h-8 leading-8 px-4 outline-none

			&[color=okay]
				@apply bg-[var(--cOkay)]
				color: var(--cTextOkay, --cTextBack)
			&[color=fail]
				@apply bg-[var(--cFail)]
				color: var(--cTextFail, --cTextBack)
			&[white]
				@apply lead-b2-8
</style>
