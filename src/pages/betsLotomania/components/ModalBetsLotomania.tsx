import { checkBets, generateBets } from '@/services/betsLotomania';
import { ModalForm } from '@ant-design/pro-form';
import { Col, Form, Input, notification, Row, Select } from 'antd';
import { useState } from 'react';

interface Props {
  createModalVisible: boolean;
  reload: Function;
  setModalVisible: Function;
}

export default function ModalBetsLotomania({ createModalVisible, setModalVisible, reload }: Props) {
  const [type, setType] = useState('G');


  async function handleAdd(form: API.BrandItem) {
    type === 'G' ? await generateBets(form) : await checkBets(form)
    notification.success({
      message: 'Sucesso!',
      description: 'Registro salvo com sucesso.',
    });
  }
  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
      }}
      title={'Alteração de senha'}
      width="300px"
      visible={createModalVisible}
      onVisibleChange={setModalVisible}
      onFinish={async (value) => {
        await handleAdd(value);
        setModalVisible(false);
        reload()
      }}
    >
      <Form.Item label="Tipo">
        <Select defaultValue="G" style={{ width: 120 }} allowClear onChange={(e) => setType(e)}>
          <Select.Option value="G">Gerar Jogo</Select.Option>
          <Select.Option value="C">Conferir Jogo</Select.Option>
        </Select>
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Concurso" name="concurso">
            <Input />
          </Form.Item>
        </Col>
        {type === 'G' ? <Col span={12}><Form.Item label="QTD" name="quantidade">
          <Input />
        </Form.Item></Col> : null}

      </Row>
    </ModalForm>
  );
}
