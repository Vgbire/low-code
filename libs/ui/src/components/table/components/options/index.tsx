import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider } from 'antd';
import './index.scss';
import { IListItem } from '../../../../types/index';

interface IProps {
  value?: any;
  options?: IListItem[];
  mode?: 'multi';
  fieldNames: {
    label?: string;
    value?: string;
    options?: string;
    groupLabel?: string;
  };
  onSelect: (value: any, option: any) => void;
  onCancel?: () => void;
}

export const Options = (props: IProps) => {
  const { value, options, fieldNames, mode, onSelect, onCancel } = props;
  const { label: labelField = 'label', value: valueField = 'value' } =
    fieldNames;

  const [checkboxOptions, setCheckboxOptions] = useState<IListItem[]>([]);
  const searchCheckboxRef: any = useRef();
  const [indeterminate, setIndeterminate] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  useEffect(() => {
    if (mode === 'multi') {
      setCheckboxOptions(
        options?.map((item) => {
          item.checked = !!value?.includes(item.value);
          return item;
        }) as IListItem[]
      );
      if (options?.length === 0 || !value || value?.length === 0) {
        setAllChecked(false);
        setIndeterminate(false);
      } else if (
        Number(options?.length) >= 0 &&
        value?.length === options?.length
      ) {
        setAllChecked(true);
        setIndeterminate(false);
      } else {
        setAllChecked(false);
        setIndeterminate(true);
      }
    }
  }, [value, options, mode]);

  useEffect(() => {
    if (mode === 'multi') {
      if (searchCheckboxRef.current) {
        searchCheckboxRef.current.indeterminate = indeterminate;
      }
    }
  }, [indeterminate, mode]);

  return (
    <div
      style={{
        width: '200px',
        maxHeight: '250px',
        overflow: 'hidden auto',
      }}
    >
      {!options?.length && (
        <div style={{ textAlign: 'center', margin: '8px 0' }}>暂无数据</div>
      )}
      {!mode && !!options?.length && (
        <div
          style={{
            padding: '4px 0',
          }}
        >
          {options?.map((item: IListItem) => {
            if (item.options) {
              return (
                <div key={item.label}>
                  <div className="option-group-label">{item.label}</div>
                  {item.options.map((item: IListItem) => {
                    return (
                      <div
                        className="option-item"
                        style={{ padding: '6px 20px' }}
                        key={item[valueField]}
                        onClick={() => {
                          onSelect(item[valueField], item);
                        }}
                      >
                        {item[labelField]}
                      </div>
                    );
                  })}
                </div>
              );
            }
            return (
              <div
                className="option-item"
                key={item[valueField]}
                onClick={() => {
                  onSelect(item[valueField], item);
                }}
              >
                {item[labelField]}
              </div>
            );
          })}
        </div>
      )}
      {mode === 'multi' && !!options?.length && (
        <>
          <div style={{ padding: '4px 0' }}>
            <div
              className="option-item"
              style={{ padding: '6px 10px' }}
              onClick={() => {
                if (indeterminate || !allChecked) {
                  setCheckboxOptions(
                    checkboxOptions.map((item) => {
                      item.checked = true;
                      return item;
                    })
                  );
                  setAllChecked(true);
                } else {
                  setCheckboxOptions(
                    checkboxOptions.map((item) => {
                      item.checked = false;
                      return item;
                    })
                  );
                  setAllChecked(false);
                }
                setIndeterminate(false);
              }}
            >
              <input
                type="checkbox"
                readOnly
                ref={searchCheckboxRef}
                className="search-checkbox"
                checked={allChecked}
              />
              (全选)
            </div>
            {checkboxOptions?.map((item: IListItem, index: number) => {
              return (
                <div
                  key={item[valueField]}
                  className="option-item"
                  style={{ padding: '6px 10px' }}
                  onClick={() => {
                    checkboxOptions[index].checked = !item.checked;
                    setCheckboxOptions([...checkboxOptions]);
                    const checkedList = checkboxOptions.filter(
                      (item) => item.checked
                    );
                    if (checkedList.length === 0) {
                      setIndeterminate(false);
                      setAllChecked(false);
                    } else if (checkedList.length === checkboxOptions.length) {
                      setIndeterminate(false);
                      setAllChecked(true);
                    } else if (checkedList.length < checkboxOptions.length) {
                      setIndeterminate(true);
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    readOnly
                    className="search-checkbox"
                    checked={item.checked}
                  />
                  {item[labelField]}
                </div>
              );
            })}
          </div>
          <div>
            <Divider style={{ margin: '0' }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                type="link"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  flex: 1,
                }}
                onClick={onCancel}
              >
                取消
              </Button>
              <Divider type="vertical" />
              <Button
                type="link"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  flex: 1,
                }}
                onClick={() => {
                  let selectedList: any = checkboxOptions.filter(
                    (item) => item.checked
                  );
                  if (selectedList.length === 0) {
                    selectedList = undefined;
                  }
                  onSelect(
                    selectedList?.map((item: any) => item.value),
                    selectedList
                  );
                }}
              >
                确定
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Options.defaultProps = {
  fieldNames: {
    label: 'label',
    value: 'value',
    options: 'options',
    groupLabel: 'groupLabel',
  },
};
