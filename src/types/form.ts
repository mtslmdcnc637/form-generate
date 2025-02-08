export type FieldType = 'text' | 'email' | 'number';

export interface PredefinedField {
  id: string;
  name: string;
  type: FieldType;
  defaultLabel: string;
  defaultPlaceholder: string;
  defaultIcon: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  icon: string;
  required: boolean;
  fontSize: number;
}

export interface FormStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderRadius: number;
  formBackground: string;
  placeholderColor: string;
  iconColor: string;
  fontSize: number;
}

export interface FormConfig {
  fields: FormField[];
  style: FormStyle;
}
