import { createUser, updateUser } from '@/services/users';
import { ModalForm } from '@ant-design/pro-form';
import { Col, Form, Input, notification, Row, Switch } from 'antd';

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
    else await createUser(form);

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
          <Form.Item label="Nome" name="name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Login" name="login">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        {values ? null : (
          <Col span={12}>
            <Form.Item label="Senha" name="password">
              <Input />
            </Form.Item>
          </Col>
        )}
        <Col span={12}>
          <Form.Item initialValue={true} name="active" label="Ativo?" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </ModalForm>
  );
}
