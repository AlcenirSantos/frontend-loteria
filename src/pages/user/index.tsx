import { PaginationTextTraslate } from '@/components/PaginationTextTraslate';
import { users } from '@/services/users';
import { maskDocument, maskPhone } from '@/utils/hooks/mask';
import { PlusOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Card, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, history } from 'umi';
import ModalPassword from './components/ModalPassword';
import ModalRegister from './components/ModalRegister';
import styles from './index.less';
interface ICompany {
  name: string;
  cnpj: string;
  phoneNumber: string;
  email: string;
  schema: string;
  alias: string;
  stateRegistration: string;
  municipalRegistration: string;
  cnae: string;
  webSite: string;
  taxRegime: string;
}
const User: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.User | null>();

  useEffect(() => {
    if (!createModalVisible) setCurrentRow(null);
  }, [createModalVisible]);

  const columns: ProColumns<API.User>[] = [
    {
      title: <FormattedMessage id="pages.user.name"/>,
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.user.login"/>,
      dataIndex: 'login',
      sorter: true,
    },
    {
      hideInForm: true,
      hideInSearch: true,
      hideInSetting: true,
      render: (_, entry) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setModalVisible(true);
                setCurrentRow(entry);
              }}
            >
              Editar
            </Button>
          </>
        );
      },
      dataIndex: 'id',
    },
  ];

  return (
    <PageContainer>
      <GridContent>
        <ProTable<API.User, API.PageParams>
          actionRef={actionRef}
          search={{
            labelWidth: 120,
          }}
          rowKey={'id'}
          columns={columns}
          request={users}
          pagination={{
            showTotal: (total, range) => <PaginationTextTraslate total={total} range={range} />,
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="Novo" />
            </Button>,
          ]}
        />
        <ModalRegister
          createModalVisible={createModalVisible}
          handleAdd={() => false}
          setModalVisible={setModalVisible}
          reload={() => actionRef.current?.reload()}
          values={currentRow as API.User}
        />
      </GridContent>
    </PageContainer>
  );
};

export default User;
