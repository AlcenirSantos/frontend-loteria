import { checkBets, generateBets, generateBetsRules } from '@/services/betsLotofacil';
import { ModalForm } from '@ant-design/pro-form';
import { Col, Form, Input, notification, Row, Select } from 'antd';
import { useState } from 'react';

interface Props {
  createModalVisible: boolean;
  reload: Function;
  setModalVisible: Function;
}

export default function ModalBetsLotofacil({ createModalVisible, setModalVisible, reload }: Props) {
  const [type, setType] = useState('G');

  async function handleAdd(form: API.BrandItem) {
    if (type === 'G') {
      await generateBets(form);
    }
    else if (type === 'C') {
      await checkBets(form);
    }
    else if (type === 'GR') {
      await generateBetsRules(form);
    }
    notification.success({
      message: 'Sucesso!',
      description: 'Registro salvo com sucesso.',
    });
  }

  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
        onCancel: () => { setType('G') }
      }}
      title={'Apostas'}
      width="500px"
      visible={createModalVisible}
      onVisibleChange={setModalVisible}
      onFinish={async (value) => {
        await handleAdd(value);
        setModalVisible(false);
        setType('G')
        reload()
      }}
    >
      <Form.Item label="Tipo">
        <Select defaultValue="G" onChange={(e) => setType(e)}>
          <Select.Option value="G">Gerar Jogo Interno Externos</Select.Option>
          <Select.Option value="GR">Gerar Jogo Primo, Puro Par, Puro Impar</Select.Option>
          <Select.Option value="C">Conferir Jogo</Select.Option>
        </Select>
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Concurso" name="concurso" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        {type !== 'C' && <Col span={12}><Form.Item label="QTD" name="quantidade" rules={[{ required: true }]}>
          <Input />
        </Form.Item></Col>}
      </Row>
      {type === 'GR' && <Row gutter={[16, 8]}>
        <Col span={8}>
          <Form.Item label="Primos" name="primos">
            <Select>
              <Select.Option value="5">5</Select.Option>
              <Select.Option value="6">6</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Puro Par" name="puroPar">
            <Select >
              <Select.Option value="6">6</Select.Option>
              <Select.Option value="7">7</Select.Option>
              <Select.Option value="8">8</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Puro Impar" name="puroImpar">
            <Select>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>}

    </ModalForm>
  );
}
