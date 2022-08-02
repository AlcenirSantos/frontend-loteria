import { PaginationTextTraslate } from '@/components/PaginationTextTraslate';
import { lotomanias } from '@/services/lotomania';
import { PlusOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Card, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, history } from 'umi';
import ModalRegister from './components/ModalRegister';
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
      title: <FormattedMessage id="pages.user.concurso" defaultMessage='concurso' />,
      dataIndex: 'concurso',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.user.data" defaultMessage='data' />,
      dataIndex: 'data',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.user.resultado" defaultMessage='Jogo' />,
      dataIndex: 'resultado',
      sorter: true,
      width: '40%'
    },
    {
      title: <FormattedMessage id="pages.user.quinze" defaultMessage='quinze' />,
      dataIndex: 'quinze',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.user.dezesseis" defaultMessage='dezesseis' />,
      dataIndex: 'dezesseis',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.user.dezessete" defaultMessage='dezessete' />,
      dataIndex: 'dezessete',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.user.dezoito" defaultMessage='dezoito' />,
      dataIndex: 'dezoito',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.user.dezenove" defaultMessage='dezenove' />,
      dataIndex: 'dezenove',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.user.vinte" defaultMessage='vinte' />,
      dataIndex: 'vinte',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.user.zero" defaultMessage='zero' />,
      dataIndex: 'zero',
    },
    // {
    //   hideInForm: true,
    //   hideInSearch: true,
    //   hideInSetting: true,
    //   render: (_, entry) => {
    //     return (
    //       <>
    //         <Button
    //           type="link"
    //           onClick={() => {
    //             setModalVisible(true);
    //             setCurrentRow(entry);
    //           }}
    //         >
    //           Editar
    //         </Button>
    //       </>
    //     );
    //   },
    //   dataIndex: 'id',
    // },
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
          request={lotomanias}
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
