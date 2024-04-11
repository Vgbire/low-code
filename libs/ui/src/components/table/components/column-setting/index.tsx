import React, { useEffect, useRef, useState } from 'react';
import { SettingOutlined } from '@libs/icons';
import { Button } from 'antd';
import './index.scss';
import '../options/index.scss';

interface IProps {
  localStorageKey: string;
  tableColumns: any[];
  setTableColumns: (columns: any[]) => void;
}

const ColumnSetting = (props: IProps) => {
  const { localStorageKey, tableColumns, setTableColumns } = props;

  const [showSettingPopup, setShowSettingPopup] = useState(false);
  const settingButtonRef = useRef<any>();
  const popupRef = useRef<any>();
  const changePopupShow = (e: any) => {
    if (popupRef?.current?.contains(e.target)) {
      setShowSettingPopup(true);
    } else {
      setShowSettingPopup(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', changePopupShow);
    return () => {
      document.removeEventListener('click', changePopupShow);
    };
  }, []);

  return (
    <div
      className="table-setting-container"
      style={{
        display: tableColumns.some((item) => item.showColumn !== undefined)
          ? undefined
          : 'none',
      }}
    >
      <Button
        ref={settingButtonRef}
        onClick={(e: any) => {
          e.stopPropagation();
          setShowSettingPopup(!showSettingPopup);
        }}
        icon={<SettingOutlined style={{ fontSize: 18, marginTop: 2 }} />}
      />
      <div
        ref={popupRef}
        className="table-setting-popup"
        style={{ display: showSettingPopup ? undefined : 'none' }}
      >
        {tableColumns?.map((item: any, index: number) => {
          return (
            <div
              key={item.dataIndex}
              className={`option-item ${
                item.showColumn === undefined ? 'option-item-disabled' : ''
              }`}
              style={{ padding: '6px 10px' }}
              onClick={() => {
                if (item.showColumn === undefined) return;
                tableColumns[index].showColumn = !item.showColumn;
                setTableColumns([...tableColumns]);
                localStorage.setItem(
                  localStorageKey,
                  JSON.stringify(
                    tableColumns.reduce((keys, item) => {
                      if (item.showColumn !== false) {
                        keys.push(item.dataIndex);
                      }
                      return keys;
                    }, [])
                  )
                );
              }}
            >
              <input
                type="checkbox"
                readOnly
                className="search-checkbox"
                checked={item.showColumn === undefined ? true : item.showColumn}
              />
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColumnSetting;
