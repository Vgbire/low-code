import React, { useEffect, useRef, useState } from 'react';
import { ColumnSearchProp } from '..';
import { CloseOutlined, SearchOutlined } from '@libs/icons';
import { useUpdateEffect } from 'ahooks';
import { Divider, Spin, Tag } from 'antd';
import { AnyObject } from 'src/types';
import { uuid } from '../../../utils';
import { DateTimeRangePicker } from '../components/date-picker';
import { Options } from '../components/options';
import { useTableContext } from '../context';

export interface IProps {
  columns: ColumnSearchProp[];
  filterData: AnyObject;
  setFilterData: (filter: AnyObject) => void;
}

const Search = (props: IProps) => {
  const { columns, filterData, setFilterData } = props;
  const { fetchData } = useTableContext();

  const [isFocus, setIsFocus] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const searchInputRef = useRef<any>();

  const [currentFilter, setCurrentFilter] = useState<ColumnSearchProp>();
  // 用于渲染筛选结果的tagList
  const [filterValue, setFilterValue] = useState<ColumnSearchProp[]>([]);
  const [inputValue, setInputValue] = useState('');

  const onEnter = () => {
    if (inputValue || currentFilter) {
      pushFilterSelected({
        ...(currentFilter || columns[0]),
        value: inputValue,
      });
    } else {
      setShowPopup(false);
      fetchData?.();
    }
  };

  const clearCurrentFilter = () => {
    setInputValue('');
    setCurrentFilter(undefined);
    setShowPopup(false);
  };

  const pushFilterSelected = (currentFilter: ColumnSearchProp) => {
    filterData[currentFilter.dataIndex] = currentFilter.value;
    setFilterData({ ...filterData });
    clearCurrentFilter();
  };

  useUpdateEffect(() => {
    // 单双选更新选项和loading
    if (['select', 'multi'].includes(currentFilter?.type as string)) {
      setCurrentFilter({
        ...currentFilter,
        ...columns.find((item) => item.dataIndex === currentFilter?.dataIndex),
      });
    }
    setFilterValue(
      Object.keys(filterData).map((dataIndex: string) => {
        const current = columns.find(
          (column) => column.dataIndex === dataIndex
        ) as ColumnSearchProp;
        const value = filterData[dataIndex];
        if (current.type === 'select') {
          current.label = current.options?.find(
            (option) => option.value === value
          )?.label;
          if (!current.label) {
            current.label = current.loading ? 'loading' : value;
          }
        } else if (current.type === 'multi') {
          current.label = value?.map((item: any) => {
            let label = current.options?.find(
              (option) => option.value === item
            )?.label;
            if (!label) {
              label = current.loading ? 'loading' : item;
            }
            return label;
          });
        } else if (current.type === 'date') {
          current.label = `${value.startTime.format(
            'YYYY/MM/DD HH:mm:ss'
          )}-${value.endTime.format('YYYY/MM/DD HH:mm:ss')}`;
        } else {
          current.label = value;
        }
        return current;
      })
    );
  }, [filterData, columns]);

  const tableSearchContainerRef = useRef<any>();
  const [startTimeId] = useState(uuid());
  const [endTimeId] = useState(uuid());
  const changePopupShow = (e: any) => {
    if (
      tableSearchContainerRef?.current?.contains(e.target) ||
      document.querySelector(`.${startTimeId}`)?.contains(e.target) ||
      document.querySelector(`.${endTimeId}`)?.contains(e.target)
    ) {
      setShowPopup(true);
      setIsFocus(true);
    } else {
      setShowPopup(false);
      setIsFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', changePopupShow, { capture: true });
    return () => {
      document.removeEventListener('click', changePopupShow);
    };
  }, []);

  if (columns.length === 0) return null;
  return (
    <div style={{ display: 'flex' }}>
      <div
        ref={tableSearchContainerRef}
        className="table-search-container"
        style={{ borderColor: isFocus ? '#005dcc' : '#c3cbd3', flex: 1 }}
      >
        {filterValue.map((item, index) => {
          const TagDom = (key: number, label: string, multiIndex?: number) => {
            return (
              <Tag
                closable
                key={key}
                style={{ background: '#eef1f4' }}
                onClose={() => {
                  setShowPopup(false);
                  const dataIndex = filterValue[index].dataIndex;
                  const value = filterData[dataIndex];
                  if (item.type === 'multi') {
                    value.splice(multiIndex, 1);
                    if (value.length === 0) {
                      delete filterData[dataIndex];
                    }
                  } else {
                    delete filterData[dataIndex];
                  }
                  setFilterData({ ...filterData });
                }}
              >
                {item.title}：{label}
              </Tag>
            );
          };
          if (item.type === 'multi') {
            return item.label?.map((label: string, multiIndex: number) => {
              return TagDom(multiIndex, label, multiIndex);
            });
          }
          if (item.type === 'date') {
            return TagDom(item.dataIndex, item.label);
          }
          return TagDom(item.dataIndex, item.label);
        })}
        <span
          className="filter-label"
          style={{ display: currentFilter?.title ? undefined : 'none' }}
        >
          {currentFilter?.title + '：'}
        </span>
        <div className="search-input-container">
          <input
            ref={searchInputRef}
            value={inputValue}
            onInput={(e: any) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              // 回车
              if (e.keyCode === 13) {
                onEnter();
                // 退格
              } else if (e.keyCode === 8 && !inputValue) {
                if (currentFilter) {
                  setCurrentFilter(undefined);
                } else {
                  const deleteFilter = filterValue.pop();
                  if (deleteFilter) {
                    delete filterData[deleteFilter.dataIndex];
                    setFilterData({ ...filterData });
                  }
                }
              }
            }}
            className="iconfont search-input"
            placeholder="&#xe619; 添加筛选条件"
            style={{ paddingLeft: currentFilter?.title ? undefined : 10 }}
          />
          <div
            className="search-input-popup"
            style={{ display: showPopup ? undefined : 'none' }}
          >
            <Spin spinning={currentFilter?.loading || false}>
              {!currentFilter && (
                <Options
                  options={[{ label: '属性类型', options: columns }]}
                  fieldNames={{ value: 'dataIndex', label: 'title' }}
                  onSelect={(value, option: any) => {
                    setCurrentFilter(option);
                    if (option.type === 'input') {
                      searchInputRef.current.focus();
                      setShowPopup(false);
                    }
                  }}
                />
              )}
              {currentFilter?.type === 'select' && (
                <Options
                  options={currentFilter.options}
                  onSelect={(value, option) => {
                    currentFilter.value = value;
                    pushFilterSelected(currentFilter);
                  }}
                />
              )}
              {currentFilter?.type === 'multi' && (
                <Options
                  mode="multi"
                  value={currentFilter.value}
                  options={currentFilter.options}
                  onSelect={(value, option) => {
                    currentFilter.value = value;
                    pushFilterSelected(currentFilter);
                  }}
                  onCancel={() => {
                    setShowPopup(false);
                    setCurrentFilter(undefined);
                  }}
                />
              )}
              {currentFilter?.type === 'date' && (
                <DateTimeRangePicker
                  value={currentFilter.value}
                  startTimeId={startTimeId}
                  endTimeId={endTimeId}
                  onSelect={(value) => {
                    currentFilter.value = value;
                    pushFilterSelected(currentFilter);
                  }}
                  onCancel={() => {
                    setCurrentFilter(undefined);
                    setShowPopup(false);
                  }}
                />
              )}
            </Spin>
          </div>
        </div>
        <div className="search-operations">
          {(filterValue.length !== 0 || inputValue) && (
            <>
              <CloseOutlined
                onClick={() => {
                  clearCurrentFilter();
                  setFilterValue([]);
                }}
              />
              <Divider type="vertical" style={{ background: '#ccc' }} />
            </>
          )}
          <SearchOutlined onClick={onEnter} />
        </div>
      </div>
    </div>
  );
};

export default Search;
