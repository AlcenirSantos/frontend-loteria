import { alterPassword, createUser } from '@/services/users';
import { ModalForm } from '@ant-design/pro-form';
import { Form, Input, notification } from 'antd';

interface Props {
  createModalVisible: boolean;
  handleAdd: Function;
  setModalVisible: Function;
}

export default function ModalPassword({ createModalVisible, setModalVisible }: Props) {
  async function handleAdd(form: API.BrandItem) {
    await alterPassword(form);
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
        reload();
      }}
    >
      <Form.Item label="Nova Senha" name="password">
        <Input />
      </Form.Item>
    </ModalForm>
  );
}
