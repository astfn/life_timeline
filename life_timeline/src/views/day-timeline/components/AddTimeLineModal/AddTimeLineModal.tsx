//components
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
} from "@arco-design/web-react";
//utils
import { memo, useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { TimeUnitOptions } from "@/views/day-timeline/store/constants";
//types
import { FormElement, TimeUnitEnum } from "@/views/day-timeline/store/types";

const FormItem = Form.Item;
const Option = Select.Option;

interface ASAddTimeLineModalProps {
  visible: boolean;
  setVisible: (newVisible: boolean) => void;
  handleConfirm?: Function;
}

const ASAddTimeLineModal: React.FC<ASAddTimeLineModalProps> = (props) => {
  const { visible, setVisible, handleConfirm } = props;

  const [form] = Form.useForm();

  /**
   * 初始化表单信息
   */
  const initFieldsValue = useCallback(() => {
    form.setFieldsValue({
      weight: "1",
      unit: TimeUnitEnum.MINUTE,
    });
  }, [form]);

  useEffect(() => {
    initFieldsValue();
  }, [initFieldsValue]);

  /**
   * 获取最新的表单信息
   */
  const [formInfo, setFormInfo] = useState<FormElement>();

  function onValuesChange(_changeValues: any, values: any) {
    setFormInfo(values);
  }

  /**
   * 确认按钮事件
   */
  function handleOk() {
    form.validate((errors) => {
      if (isEmpty(errors)) {
        handleConfirm
          ? handleConfirm?.({ formInfo, handleCancel })
          : handleCancel();
      }
    });
  }

  /**
   * 关闭弹窗事件
   */
  function handleCancel() {
    setVisible(false);
    form.clearFields();
    initFieldsValue();
  }

  return (
    <Modal
      title="添加新的时间线"
      visible={visible}
      mountOnEnter={false}
      onOk={handleOk}
      onCancel={handleCancel}
      autoFocus={false}
      focusLock={true}
    >
      <Form layout="vertical" form={form} onValuesChange={onValuesChange}>
        <FormItem field="name" label="名称" rules={[{ required: true }]}>
          <Input style={{ width: 270 }} placeholder="请输入时间线名称" />
        </FormItem>
        <FormItem field="weight" label="分配时间">
          <InputNumber style={{ width: 270 }} min={1} step={1} precision={0} />
        </FormItem>
        <FormItem field="unit">
          <Select style={{ width: 270 }} placeholder="单位">
            {Object.entries(TimeUnitOptions).map(([unit, name]) => (
              <Option key={unit} value={unit}>
                {name}
              </Option>
            ))}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default memo(ASAddTimeLineModal);
