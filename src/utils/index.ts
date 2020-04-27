// 首字母 小写
export const firstLowercase = (str: string): string => {
  return str.replace(str.charAt(0), str.charAt(0).toLocaleLowerCase())
}