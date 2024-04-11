import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';

export const listMapConvert = (data: any, mode?: string) => {
  if (mode === 'map') {
    return Object.keys(data || {}).map((key: string) => {
      return {
        value: key,
        label: data[key],
      };
    });
  }
  return data?.reduce((map: any, item: any) => {
    map[item.value] = item.label;
    return map;
  }, {});
};

export const toCamel = (str: string) => {
  return str.replace(/([^_])(?:_+([^_]))/g, ($0, $1, $2) => {
    return $1 + $2.toUpperCase();
  });
};

/**
 * 生成UUID
 */
export const uuid = (): string => {
  let d: number = Date.now();

  const d2: number =
    (performance && performance.now && performance.now() * 1000) || 0;

  return 'ddxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (c: string) => {
      let r: number = Math.random() * 16;

      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d = Math.floor(d2 / 16);
      }

      const v: number = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
};

/**
 * 生成短UUID
 */
export const shortUuid = () => {
  return 'xxxxxx'.replace(/x/g, function () {
    return Math.floor(Math.random() * 16).toString(16);
  });
};

// 下载文件
export const downloadFile = (
  fileName: string,
  content: string,
  fileType = 'text/plain'
) => {
  // 创建Blob对象表示要下载的数据
  const blob = new Blob([content], { type: fileType });

  // 创建一个指向Blob的URL
  const url = URL.createObjectURL(blob);

  // 创建隐藏的可下载链接
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.download = fileName;

  // 触发点击以下载文件
  document.body.appendChild(link);
  link.click();

  // 清理
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

// 用prettier 格式化代码
export const prettierCode = (content: string) => {
  return prettier.format(content, {
    parser: 'babel',
    plugins: [parserBabel],
  });
};

// 保存光标位置的函数
export const saveCursorPosition = () => {
  const editor: any = document.activeElement; // 获取当前处于焦点的元素（假设是一个可编辑区域，比如textarea或input）
  if (editor.selectionStart !== undefined) {
    // 检查浏览器是否支持Selection API
    return {
      start: editor.selectionStart,
      end: editor.selectionEnd,
    };
  } else {
    return null;
  }
};

// 恢复光标位置的函数
export const restoreCursorPosition = (position) => {
  const editor: any = document.activeElement;
  if (position && editor.setSelectionRange) {
    editor.setSelectionRange(position.start, position.end);
  }
};
