import type { Component } from 'vue';
import {
  ElAutocomplete,
  ElCascader,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElDivider,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElTreeSelect,
  ElUpload,
} from 'element-plus';
import { InputPassword } from '@/components/InputPassword';
import { Editor } from '@/components/Editor';
import { JsonEditor } from '@/components/JsonEditor';
import { IconPicker } from '@/components/IconPicker';
import { IAgree } from '@/components/IAgree';
import type { ComponentName } from '../types';

const componentMap: Recordable<Component, ComponentName> = {
  RadioGroup: ElRadioGroup,
  RadioButton: ElRadioGroup,
  CheckboxGroup: ElCheckboxGroup,
  CheckboxButton: ElCheckboxGroup,
  Input: ElInput,
  Autocomplete: ElAutocomplete,
  InputNumber: ElInputNumber,
  Select: ElSelect,
  Cascader: ElCascader,
  Switch: ElSwitch,
  Slider: ElSlider,
  TimePicker: ElTimePicker,
  DatePicker: ElDatePicker,
  Rate: ElRate,
  ColorPicker: ElColorPicker,
  Transfer: ElTransfer,
  Divider: ElDivider,
  TimeSelect: ElTimeSelect,
  SelectV2: ElSelectV2,
  InputPassword,
  Editor,
  TreeSelect: ElTreeSelect,
  Upload: ElUpload,
  JsonEditor,
  IconPicker,
  IAgree,
};

export { componentMap };
