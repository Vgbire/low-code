import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Drawer } from 'antd';
import highlight from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/atom-one-dark.min.css';
import { copy } from 'src/utils';

highlight.registerLanguage('typescript', typescript);
highlight.registerLanguage('xml', xml);

export const CodeDrawer = forwardRef<unknown, any>((_props, ref) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const [rawContent, setRawContent] = useState('');
  useImperativeHandle(ref, () => ({
    open(content: string) {
      setOpen(true);
      setRawContent(content);
      setContent(
        highlight.highlight(content, { language: 'typescript' }).value
      );
    },
  }));

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title="代码预览"
      extra={<Button onClick={() => copy(rawContent)}>复制</Button>}
      onClose={onClose}
      open={open}
      width={800}
    >
      <div
        style={{
          background: '#282c34',
          color: '#abb2bf',
          padding: 16,
          minHeight: 'calc(100% - 32px)',
          overflow: 'auto',
          boxShadow: '0 0 #0000,0 0 #0000,7px 7px 15px 0 #000',
        }}
      >
        <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      </div>
    </Drawer>
  );
});
