import React, { useEffect, useState } from 'react';
import { RangePickerProps } from 'antd/es/date-picker';
import { Button, DatePicker, DatePickerProps, Divider } from 'antd';
import dayjs from 'dayjs';

interface IProps {
  value: { startTime: dayjs.Dayjs; endTime: dayjs.Dayjs };
  startTimeId: any;
  endTimeId: any;
  onSelect: (value: any) => void;
  onCancel: () => void;
}
export const DateTimeRangePicker = (props: IProps) => {
  const { value, startTimeId, endTimeId, onSelect, onCancel } = props;
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  useEffect(() => {
    setStartTime(value?.startTime);
    setEndTime(value?.endTime);
  }, [value]);
  return (
    <div
      style={{
        width: '310px',
        maxHeight: '250px',
        overflow: 'hidden auto',
        fontSize: '12px',
      }}
    >
      <div style={{ padding: '10px' }}>
        <div style={{ color: '#86909c', marginBottom: '5px' }}>
          请输入一个时间段
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '7px',
          }}
        >
          <label>开始日期</label>
          <DatePicker
            showTime
            popupClassName={startTimeId}
            style={{ borderRadius: '2px' }}
            value={startTime}
            format="YYYY/MM/DD HH:mm:ss"
            onChange={(
              value: DatePickerProps['value'] | RangePickerProps['value']
            ) => {
              setStartTime(value);
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>结束日期</label>
          <DatePicker
            showTime
            popupClassName={endTimeId}
            style={{ borderRadius: '2px' }}
            value={endTime}
            format="YYYY/MM/DD HH:mm:ss"
            onChange={(
              value: DatePickerProps['value'] | RangePickerProps['value']
            ) => {
              setEndTime(value);
            }}
          />
        </div>
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
              if (startTime && endTime) {
                onSelect({ startTime, endTime });
              }
            }}
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  );
};
