import { PaginationTextTraslate } from '@/components/PaginationTextTraslate';
import { bets } from '@/services/betsLotofacil';
import { maskDocument, maskPhone } from '@/utils/hooks/mask';
import { PlusOutlined } from '@ant-design/icons';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Card, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, history } from 'umi';
import ModalBetsLotofacil from './components/ModalBetsLotofacil';
import styles from './index.less';

const Welcome: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [company, setCompany] = useState<API.Company>({});
  const [createModalVisible, setModalVisible] = useState<boolean>(false);

  const companyInfo = (entry) => {
    setCompany(entry);
  };
  const columns: ProColumns<API.Company>[] = [
    {
      title: <FormattedMessage id="pages.company.concurso" defaultMessage='Concurso' />,
      dataIndex: 'concurso',
      sorter: true,
      render: (_, entry) => (
        <Button
          type="link"
          block
          onClick={() => {
            companyInfo(entry);
          }}
        >
          {entry.concurso}
        </Button>
      ),
    },
    {
      title: <FormattedMessage id="pages.company.resultado" defaultMessage='Jogo' />,
      dataIndex: 'resultado',
      sorter: false,
      width: '70%',
    },
    {
      title: <FormattedMessage id="pages.company.resultado" defaultMessage="Acertos" />,
      dataIndex: 'acertos',
      sorter: false,
    },
    {
      title: <FormattedMessage id="pages.company.resultado" defaultMessage='Valor' />,
      dataIndex: 'valor',
      sorter: false,
    },
  ];

  return (
    <PageContainer>
      <GridContent>
        <Row gutter={16}>
          <Col span={16}>
            <ProTable<API.Company, API.PageParams>
              actionRef={actionRef}
              search={{
                labelWidth: 120,
              }}
              rowKey={'id'}
              columns={columns}
              request={bets}
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
          </Col>
          <Col span={8}>
            <div className={styles.card}>
              <h1 className={styles.header}>{company.concurso}</h1>
              <div className={styles.bodyCard}>
                {company.concurso ? (
                  <div>
                    <label className={styles.labeltitle}>
                      Nome Fantasia<span>{company.concurso}</span>
                    </label>
                    <Row>
                      <Col span={24}>
                        <label className={styles.labeltitle}>
                          Jogo<span>{company.resultado}</span>
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <label className={styles.labeltitle}>
                          Valor<span>{company.valor}</span>
                        </label>
                      </Col>
                      <Col span={12}>
                        <label className={styles.labeltitle}>
                          Acertos<span>{company.acertos}</span>
                        </label>
                      </Col>
                    </Row>
                  </div>
                ) : null}
              </div>
            </div>
          </Col>
        </Row>
        <ModalBetsLotofacil
          createModalVisible={createModalVisible}
          setModalVisible={setModalVisible}
          reload={() => actionRef.current?.reload()}
        />
      </GridContent>
    </PageContainer>
  );
};

export default Welcome;
