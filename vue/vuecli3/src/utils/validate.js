export const none = null;
export const required = { required: true, message: '必填项', trigger: 'blur' };
export const number = { pattern: /^[1-9]\d*(\.\d+)?$|^0\.\d+$/, message: '请输入数字', trigger: 'blur' };
export const number8 = { pattern: /^\d{8}$/, message: '请输入8位数字', trigger: 'blur' };
export const integer = { pattern: /^[1-9]\d*$/, message: '必须是整数', trigger: 'blur' };
export const date = { type: 'date', message: '必须是时间格式', trigger: 'blur' };
export const url = { type: 'url', message: '必须是网址格式', trigger: 'blur' };
export const email = { type: 'email', message: '必须是email', trigger: 'blur' };
export const grapheme = { pattern: /^[a-zA-Z]*$/, message: '必须是字母', trigger: 'blur' };
export const letterNumber = { pattern: /^[0-9a-zA-Z]*$/, message: '必须是字母或数字', trigger: 'blur' };
export const pwd = {
  pattern: /(?=.*\d)(?=.*[A-Za-z])(?=.*_)^[A-Za-z\d_]{8,}$/,
  message: '必须要有数字、字母、下划线，不小于8位',
  trigger: 'blur'
};
