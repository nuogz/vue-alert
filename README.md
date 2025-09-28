> [!IMPORTANT]\
> 后续将提供机器翻译的英文版。\
> A machine-translated English version will be provided later.

# @nuogz/web-app-alert 告知
![Version](https://img.shields.io/github/package-json/v/nuogz/web-app-alert?style=flat-square)
![License](https://img.shields.io/github/license/nuogz/web-app-alert?style=flat-square)

Alert and notify component in Nuogz Web App, based on [Vue 3](https://vuejs.org/)\
告知组件用于在界面中心显示一个需要用户手动确认/选择的提示框，以向用户报告信息或向用户询问操作。用于Nuogz Web App，基于Vue3、UnoCSS

经过一系列的迭代，从原来的告知组件`vue-alert`升级重构为全新的`web-app-alert`

`web-app-alert`不再自行创建独立Vue App来渲染HTML，而是挂载在主APP中，以减少不必要的数据开销。\
同时`web-app-alert`支持同时显示多个通知（尽管它们的位置会重叠）。不会再像旧版本一样前者被后来的告知覆盖

基础示例：
````html
<!-- index.vue -->
<template>
  <AppOrbit>...</AppOrbit>

  <AppAlert />
</template>
<script setup>
  import { AppAlert, $alert, $quest } from '@nuogz/web-app-alert';

  onMounted(async ()=> {
    const result = await $quest('今天吃饭了吗？');

    if(result) {
      $alert('今天吃饭了');
    }
  })
</script>
````

告知由多个`异步函数`与组件`<AppAlert>`组成。
`<AppTip>`组件用于动态渲染展示告知所需要的HTML元素。

**请将`<AppTip>`置于app的根元素下**

## DOM结构
- body
  - app (index.vue)
    - (module.vue)
    - `<dialog app-alert>`
      - p-title（标题）
      - p-body
        - p-content（正文）
        - p-clicks
          - p-click（操作按钮）

如果app使用天轨Orbit组件，那么DOM结构如下：
- body
  - app (index.vue)
    - app-moon
    - app-main
      - (module.vue)
    - app-moon
    - `<dialog app-alert>`
      - p-title（标题）
      - p-body
        - p-content（正文）
        - p-clicks
          - p-click（操作按钮）

注意：相关元素会根据同时调用次数增多，每次告知对应一套元素。并不是单例模式

## 通用参数类型
### 1、AlertOption 告知选项
`object` 用于指定除正文以为的选项，均可选
| 值             | 作用     | 类型               | 说明                                                         |
| -------------- | -------- | ------------------ | ------------------------------------------------------------ |
| `title`        | 标题     | `string`           | 默认值 `提示`                                                |
| `colorTop`     | 颜色     | `string`           | 默认值 `var(--main-solid)`                                   |
| `cancel`       | 取消值   | `Symbol('cancel')` | 对于选择型告知，可以不做选择，此时返回一个Symbol，而非布尔值 |
| `orderButtons` | 按钮顺序 | `'asc' 或 'desc'`  | 默认值 `desc`。常用于关键确认时将按钮顺序反向，防止误操作    |

### 2、AlertButton 告知按钮
`object` 用于指定按钮样式
| 值          | 作用     | 类型      | 说明                                                                                                                             |
| ----------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `text`      | 文本     | `string`  | [`cancel`为`false`时必要] 按钮文本内容                                                                                           |
| `value`     | 值       | `any`     | [`cancel`为`false`时必要] 选择按钮后的返回值                                                                                     |
| `reverse`   | 反转按钮 | `boolean` | 默认值 `false`。一个用于表达否定意义的预设样式                                                                                   |
| `cancel`    | 取消按钮 | `boolean` | 默认值 `false`。<br>预设按钮，设置为`true`后可默认文本为`取消`，样式为`反转`，返回值为选项提供的`取消值`。<br>预设属性据可被覆盖 |
| `color`     | 颜色     | `string`  | 默认值 `var(--main-solid)`                                                                                                       |
| `colorText` | 文本颜色 | `string`  | 默认值 `var(--contrast)`                                                                                                         |

## 颜色
结合Nuogz Web App的颜色方案，告知预设了三个功能性颜色。

通过给`AlertOption[colorTop]`/`AlertButton[color]`等属性传递`$`开始的字符串，以表示使用预设颜色。\
此时告知不会`color*`的值设置为样式，转而设置HTML属性`color=warn`（移除`$`）以引用CSS样式
| 值      | 对应颜色变量  | 作用 |
| ------- | ------------- | ---- |
| `$warn` | `var(--warn)` | 警告 |
| `$okay` | `var(--okay)` | 成功 |
| `$fail` | `var(--fail)` | 失败 |

## 函数说明
### 0、$show
最基础的告知函数，其他告知函数均基于该函数
````typescript
function $show(content: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>
````

### 1、$alert
用于普通告知
````typescript
function $alert(content?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>
````
| 参数  | 预设                |
| ----- | ------------------- |
| 标题  | 告知                |
| 正文  | `content`           |
| 颜色  | `var(--main-solid)` |
| 按钮1 | 确定 = `true`       |

### 2、$warn
用于警告/注意等告知
````typescript
function $warn(content?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;
````
| 参数  | 预设          |
| ----- | ------------- |
| 标题  | 注意          |
| 正文  | `content`     |
| 颜色  | `$warn`       |
| 按钮1 | 确定 = `true` |

### 3、$quest
用于询问用户选择的告知
````typescript
function $quest(content?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;
````
| 参数  | 预设                 |
| ----- | -------------------- |
| 标题  | 询问                 |
| 正文  | `content`            |
| 颜色  | `var(--main-solid)`  |
| 按钮1 | 是 = `true`          |
| 按钮2 | 否 = `false`（反转） |

### 4、$quest3
用于询问用户选择的告知（可取消）
````typescript
function $quest3(content?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;
````
| 参数  | 预设                              |
| ----- | --------------------------------- |
| 标题  | 询问                              |
| 正文  | `content`                         |
| 颜色  | `var(--main-solid)`               |
| 按钮1 | 是 = `true`                       |
| 按钮2 | 否 = `false`（反转）              |
| 按钮3 | 取消 = `Symbol('cancel')`（反转） |

### 5、$okay
用于成功/完成等告知
````typescript
function $okay(action?: string, next?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;
````
| 参数  | 预设                            |
| ----- | ------------------------------- |
| 标题  | 成功                            |
| 正文  | `${action='操作'}成功。${next}` |
| 颜色  | `$okay`                         |
| 按钮1 | 确定 = `true`                   |

### 6、$fail
普通告知函数
````typescript
function $fail(action?: string, next?: string, option?: AlertOption, ...buttons: AlertButton[]): Promise<any>;
````
| 参数  | 预设                            |
| ----- | ------------------------------- |
| 标题  | 失败                            |
| 正文  | `${action='操作'}失败。${next}` |
| 颜色  | `$okay`                         |
| 按钮1 | 确定 = `true`                   |
