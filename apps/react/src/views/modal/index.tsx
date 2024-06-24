import React, { useEffect, useRef, useState } from 'react';
import { ColumnType } from 'antd/lib/table';
import { useUpdateEffect } from 'ahooks';
import { Button, Col, Modal, Row } from 'antd';
import { useFormHook } from 'views/form/hook/form';
import { Operations } from 'src/component/Operations';
import { TemplateTagList } from 'src/component/TemplateTagList';
import { StorageNameMap } from 'src/const';
import { AnyObject } from 'src/types';
import { downloadFile, uuid } from 'src/utils';
import {
  ModalGlobalControl,
  ModalAttribute,
} from './component/ModalGlobalControl';
import './index.scss';
import { getModalTemplate } from './utils/template';
import { ComponentBody } from '../component/component/ComponentBody';
import { BodyType } from '../component/component/ComponentGlobalControl';
import { FormColumn } from '../form';
import { FormFieldControl } from '../form/component/FormFieldControl';
import {
  FormAttribute,
  FormGlobalControl,
} from '../form/component/FormGlobalControl';
import { TableColumnControl } from '../table/component/TableColumnControl';
import {
  TableAttribute,
  TableGlobalControl,
} from '../table/component/TableGlobalControl';
import { useTableHook } from '../table/hook/table';

interface TemplateList extends ModalAttribute {
  templateId: string;
  columns: FormColumn[];
  formAttribute: FormAttribute;
  tableAttribute: TableAttribute;
  tableColumns: ColumnType<any>[];
  dataSource: AnyObject[];
}

const ModalComponent = () => {
  const formBodyRef: any = useRef();
  const tableBodyRef: any = useRef();
  const [open, setOpen] = useState(true);

  // form body hook
  const {
    form,
    columns,
    setColumns,
    currentFormIndex,
    setCurrentFormIndex,
    formAttribute,
    setFormAttribute,
  } = useFormHook();
  const [isForm, setIsForm] = useState(false);

  // table body hook
  const {
    tableColumns,
    setTableColumns,
    dataSource,
    setDataSource,
    currentColumn,
    setCurrentColumn,
    tableAttribute,
    setTableAttribute,
    tableDemoColumns,
    addTableColumns,
  } = useTableHook();
  const [isTable, setIsTable] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // 全局配置属性
  const [modalAttribute, setModalAttribute] = useState<ModalAttribute>({
    name: 'ModalComponent',
    exportName: 'ModalComponent',
    extension: '.tsx',
    attribute: {
      title: '标题',
      width: 750,
    },
    body: [
      { type: 'string', content: 'Some contents...', key: uuid() },
      { type: 'form', content: 'Some contents...', key: uuid() },
      { type: 'table', content: 'Some contents...', key: uuid() },
    ],
  });
  const setBody = (body: BodyType[]) => {
    setModalAttribute({ ...modalAttribute, body });
  };

  const [templateList, setTemplateList] = useState<TemplateList[]>([]);
  useEffect(() => {
    setTemplateList(
      JSON.parse(localStorage.getItem(StorageNameMap.modal) || '[]')
    );
  }, []);

  useUpdateEffect(() => {
    localStorage.setItem(StorageNameMap.modal, JSON.stringify(templateList));
  }, [templateList]);

  // 模板id，定位本地存储的模板
  const [templateId, setTemplateId] = useState(uuid());
  const saveTemplate = () => {
    if (!modalAttribute.templateName) {
      modalAttribute.templateName = '模板';
    }
    const currentTemplate: TemplateList = {
      templateId,
      columns,
      formAttribute,
      tableAttribute,
      tableColumns,
      dataSource,
      ...modalAttribute,
    };
    const index = templateList.findIndex(
      (item: TemplateList) => item.templateId === templateId
    );
    if (index === -1) {
      templateList.push(currentTemplate);
    } else {
      templateList[index] = currentTemplate;
    }
    setTemplateList([...templateList]);
  };
  const previewCode = () => {
    return getModalTemplate(
      modalAttribute,
      { ...formAttribute, columns },
      {
        ...tableAttribute,
        dataSource,
        columns: tableColumns,
      }
    );
  };
  const exportCode = () => {
    downloadFile(
      modalAttribute.exportName + modalAttribute.extension,
      getModalTemplate(
        modalAttribute,
        { ...formAttribute, columns },
        {
          ...tableAttribute,
          dataSource,
          columns: tableColumns,
        }
      )
    );
  };

  // 回填模板数据
  const templateClick = (template: TemplateList) => {
    const {
      templateId,
      columns,
      formAttribute,
      tableAttribute,
      tableColumns,
      dataSource,
      ...modalAttribute
    } = template;
    setTemplateId(templateId);
    setModalAttribute(modalAttribute);
    setColumns(columns);
    setFormAttribute(formAttribute);
    setTableAttribute(tableAttribute);
    setTableColumns(tableColumns);
    setDataSource(dataSource);
  };

  return (
    <Row style={{ height: '100%' }}>
      <Col
        ref={(ref) => {
          ref?.addEventListener(
            'click',
            (e) => {
              setIsForm(formBodyRef?.current?.contains(e.target));
              setIsTable(tableBodyRef?.current?.contains(e.target));
            },
            true
          );
        }}
        span={16}
        style={{ padding: '10px 15px 10px', borderRight: '1px solid #ccc' }}
        className="my-modal-container"
      >
        <Operations
          type={StorageNameMap.modal}
          saveTemplate={saveTemplate}
          previewCode={previewCode}
          exportCode={exportCode}
          setTemplateList={setTemplateList}
        />
        <TemplateTagList
          templateId={templateId}
          templateList={templateList}
          setTemplateList={setTemplateList}
          templateClick={templateClick}
        />
        <div>
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
        </div>
        <Modal
          wrapClassName="my-modal-wrapper"
          getContainer={() =>
            document.querySelector('.my-modal-container') as HTMLElement
          }
          open={open}
          onOk={handleOk}
          mask={false}
          maskClosable={false}
          onCancel={handleCancel}
          {...modalAttribute.attribute}
        >
          <ComponentBody
            formBodyRef={formBodyRef}
            tableBodyRef={tableBodyRef}
            body={modalAttribute.body}
            setBody={setBody}
            form={form}
            columns={columns}
            setColumns={setColumns}
            formAttribute={formAttribute}
            setCurrentFormIndex={setCurrentFormIndex}
            tableColumns={tableColumns}
            setTableColumns={setTableColumns}
            dataSource={dataSource}
            tableDemoColumns={tableDemoColumns}
            addTableColumns={addTableColumns}
            tableAttribute={tableAttribute}
            setCurrentColumn={setCurrentColumn}
          />
        </Modal>
      </Col>
      <Col span={8} style={{ padding: '10px 15px 10px' }}>
        {!isForm && !isTable && (
          <ModalGlobalControl
            modalAttribute={modalAttribute}
            setModalAttribute={setModalAttribute}
          />
        )}
        {isForm && currentFormIndex > -1 && (
          <FormFieldControl
            currentFormIndex={currentFormIndex}
            columns={columns}
            setColumns={setColumns}
          />
        )}
        {isForm && currentFormIndex === -1 && (
          <FormGlobalControl
            formAttribute={formAttribute}
            setFormAttribute={setFormAttribute}
            hiddenGlobalControl
          />
        )}
        {isTable && currentColumn && (
          <TableColumnControl
            currentColumn={currentColumn}
            setCurrentColumn={setCurrentColumn}
            tableColumns={tableColumns}
            setTableColumns={setTableColumns}
            dataSource={dataSource}
            setDataSource={setDataSource}
            addTableColumns={addTableColumns}
          />
        )}
        {isTable && !currentColumn && (
          <TableGlobalControl
            tableAttribute={tableAttribute}
            setTableAttribute={setTableAttribute}
            dataSource={dataSource}
            setDataSource={setDataSource}
            hiddenGlobalControl
          />
        )}
      </Col>
    </Row>
  );
};

export default ModalComponent;
