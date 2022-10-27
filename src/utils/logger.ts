const ELEMENT_TIPTAP_TIP = '[Element-Tiptap Tip]';

export default class Logger {
  static warn(msg: string) {
    console.warn(`${ELEMENT_TIPTAP_TIP} ${msg}`);
  }

  static error(msg: string) {
    console.error(`${ELEMENT_TIPTAP_TIP} ${msg}`);
  }
}
