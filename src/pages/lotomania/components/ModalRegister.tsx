import { createLotomania } from '@/services/lotomania';
import { createUser, updateUser } from '@/services/users';
import { MaskTypes } from '@/utils/hooks/mask';
import { ModalForm } from '@ant-design/pro-form';
import { Col, Form, Input, notification, Row, Switch } from 'antd';
import { MaskedInput } from 'antd-mask-input';

interface Props {
  createModalVisible: boolean;
  handleAdd: Function;
  setModalVisible: Function;
  reload: Function;
  values?: Partial<API.User>;
}

export default function ModalRegister({
  createModalVisible,
  setModalVisible,
  reload,
  values,
}: Props) {
  async function handleAdd(form: API.User) {
    if (values) await updateUser({ ...values, ...form });
    else await createLotomania(form);

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
      initialValues={{
        name: values?.name,
        login: values?.login,
        active: values?.active,
      }}
      title={values ? 'Editar Usuário' : 'Novo Usuário'}
      width="500px"
      visible={createModalVisible}
      onVisibleChange={setModalVisible}
      onFinish={async (value) => {
        await handleAdd(value);
        setModalVisible(false);
        reload();
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Concurso" name="concurso">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Data Sorteio" name="data">
            <MaskedInput mask={MaskTypes.DATE} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Numeros Sorteados" name="resultado">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="quinze" name="quinze">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="dezesseis" name="dezesseis">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="dezessete" name="dezessete">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="dezoito" name="dezoito">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="dezenove" name="dezenove">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="vinte" name="vinte">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="zero" name="zero">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </ModalForm>
  );
}
