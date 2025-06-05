import type { useTranslation } from "react-i18next"

export type AimSetter = 'NumberSetter' | 'ImageSetter' | 'TextareaSetter' | 'AlignSetter' | 'FontSizeSetter' | 'InputSetter' | 'SwitchSetter'

export type AimEvents = 'click' | 'focus' | 'blur' | 'change'

export type FormEventsHandler<T extends Record<string, any>> = {
  [K in AimEvents as `on${Capitalize<string & K>}`]?: Record<keyof T, AimAction>
}

export type AimActionsType = 'submit'

export type AimPropertyValueTypes = {
  string: string
  number: number
  boolean: boolean
  array: Array<any>
  object: Record<string, any>
}

export interface AimPropertySetter { // 右侧属性设置区域配置项
  key: string
  setter: AimSetter
  type: keyof AimPropertyValueTypes
  label: string
  default?: string | number | boolean
  props?: Record<string, any>
  placeholder?: string
  visible?: string // 属性是否显示在面板中
}

export interface AimAction {
  type: AimActionsType;
  args: Record<string, any>;
  path: string;
  method: string;
  name: string;
  fail?: (...args: unknown[]) => void;
  success?: (...args: unknown[]) => void;
}

export interface AimComponentStore {
  layoutId: string // 布局ID
  properties?: Array<AimPropertySetter> // 属性配置表单，可以用于渲染右侧配置表
  data?: Record<string, any> // 属性配置表单属性数据
}

export interface AimForm<T extends Record<string, any>> {
  storageKey?: string
  nodes: AimNode<(keyof T) | ''>[]
  data?: T // 表单数据
  actions?: FormEventsHandler<T> // 行为列表
}


export interface AimNode<T = string> {
  id: string; // 节点ID（UUID）
  url: string; // 节点对应的组件URL地址
  component: string; // 组件名
  label: string; // 标签
  name?: T; // 组件在表单中的 name
  data?: Record<string, any>; // 节点关联的数据 // Props 数据
  style?: Record<string, any>; // style样式对象
  source?: { // 数据源 -> 数据源面板
    srcId: string; // 数据源id
    srcPath: string; // 数据路径
  },
  class?: string | string[]; // class样式信息
  visible?: boolean; // 是否可见
  children?: AimNode[]; // 子节点数组
}

/**
 * 表单输入组件的基础属性
 *
 * @export
 * @interface BaseComponentProps
 */
export interface BaseComponentProps {
  value?: any
  formData?: Record<string, any>
  updateProps?: (key: string, value: any) => any
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  className?: string
  label?: string
  helpText?: string
  required?: boolean
  type?: string
  _languagePrefix?: string,
  _t?: ReturnType<typeof useTranslation>['t'],
}

export interface AimComponent extends Omit<AimComponentStore, 'layoutId'> {
  // TODO: change type
  default: any
}