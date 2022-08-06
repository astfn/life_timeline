import { AnyAction } from "redux";
import { Base64 } from "js-base64";
/**
 * 将派遣的 thunk action 转化为 redux 能够识别的 AnyAction 类型
 */
export function ThunkFuncAsAnyAction(thunkActionFunc: Function) {
  return thunkActionFunc as unknown as AnyAction;
}

/**
 * 编码器（base64）
 */
export function Encode(plaintext: string) {
  return Base64.encode(plaintext);
}
/**
 * 解码器（base64）
 */

export function Decode(ciphertext: string) {
  return Base64.decode(ciphertext);
}
