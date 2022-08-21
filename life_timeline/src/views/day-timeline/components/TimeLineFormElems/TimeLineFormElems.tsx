//components
import { StyledWrapper } from "./style";
import ASTimeInput from "@/views/day-timeline/components/time-input";
import AddTimeLineModal from "@/views/day-timeline/components/AddTimeLineModal/AddTimeLineModal";
import { Button, Form, Message } from "@arco-design/web-react";
import { IconLeft, IconRight } from "@arco-design/web-react/icon";
//types
import {
  DayTimeLineStore,
  FormElement,
} from "@/views/day-timeline/store/types";
//utils
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  useShowUsableQuantity,
  useTimeLineIsFull,
} from "@/views/day-timeline/store/hooks";
import {
  addTimeLineAction,
  updateFormItemsValue_Thunk,
} from "@/views/day-timeline/store/actoinCreators";
import { timeLineIsRepeat, toMinute } from "@/views/day-timeline/store/utils";

const ButtonGroup = Button.Group;

const ASDayTimeLineFormElems: React.FC = () => {
  /**
   * store
   */
  const { formElements } = useSelector((store: any) => {
    const dayTimeLineStore = store.dayTimeLineStore as DayTimeLineStore;
    return {
      formElements: dayTimeLineStore.formElements,
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  /**
   * 表单元素相关
   */
  const [form] = Form.useForm();
  const [formInfo, setFormInfo] = useState<{ [id: string]: string }>({});

  //初始化、更新表单信息
  useLayoutEffect(() => {
    console.log("watch_formElements", formElements);
    Object.entries(formElements).forEach(([id, formElem]) => {
      form.setFieldValue(id, formElem.weight);
    });
  }, [form, formElements]);

  //获取最新的表单信息
  function onValuesChange(_changeValues: any, values: any) {
    setFormInfo(values);
  }

  function renderFormElements() {
    return Object.entries(formElements).map(([id, formElem]) => {
      return (
        <div key={id}>
          <ASTimeInput field={id} info={formElem} />
        </div>
      );
    });
  }

  /**
   * updateVisualized
   */
  function updateVisualized() {
    dispatch(
      updateFormItemsValue_Thunk({
        formItemIdMapNewValue: formInfo,
        formElements,
      })
    );
  }

  /**
   * AddTimeLineModal 相关
   */
  const [visible, setVisible] = useState<boolean>(false);

  const { isFull, usableQuantity } = useTimeLineIsFull();

  const { hour, minute } = useShowUsableQuantity();
  const showUsableQuantity = `您还可分配 ${hour} 小时 ${minute} 分钟`;
  const [addFormItemMsgSwitch, setAddFormItemMsgSwitch] = useState<
    "init" | boolean
  >("init");

  useEffect(() => {
    if (addFormItemMsgSwitch === "init" || addFormItemMsgSwitch === false)
      return;
    Message.success({
      content: `添加成功 (您还可分配 ${hour} 小时 ${minute} 分钟)`,
    });
    setAddFormItemMsgSwitch(!addFormItemMsgSwitch);
  }, [addFormItemMsgSwitch, hour, minute]);

  const handleConfirmAddTimeLine = useCallback(
    ({
      formInfo,
      handleCancel,
    }: {
      formInfo: FormElement;
      handleCancel: Function;
    }) => {
      if (usableQuantity - toMinute(formInfo) < 0) {
        Message.error({
          content: `所分配时间已超过阈值 (${showUsableQuantity})`,
        });
      } else {
        if (timeLineIsRepeat(formInfo.name, formElements)) {
          Message.error({ content: `已存在相同的时间线！` });
          return;
        }
        dispatch(addTimeLineAction(formInfo));
        setAddFormItemMsgSwitch(true);
        handleCancel();
      }
    },
    [dispatch, formElements, showUsableQuantity, usableQuantity]
  );

  const AddTimeLineModalProps = useMemo(() => {
    return {
      visible,
      setVisible,
      handleConfirm: handleConfirmAddTimeLine,
    };
  }, [handleConfirmAddTimeLine, visible]);

  console.log(showUsableQuantity);
  const handleAddTimeLine = useCallback(() => {
    !isFull
      ? setVisible(true)
      : Message.info({ content: "您已完美分配时间😀" });
  }, [isFull]);

  return (
    <div className="day-timeline-form-elems">
      <StyledWrapper>
        <header>
          <h3 style={{ textAlign: "center" }}>
            您还有 {hour} 小时 {minute} 分钟可自由支配
          </h3>
        </header>
        <main>
          <Form layout="vertical" form={form} onValuesChange={onValuesChange}>
            <div className="space">{renderFormElements()}</div>
          </Form>
        </main>
        <footer>
          <ButtonGroup>
            <Button
              type="primary"
              icon={<IconLeft />}
              shape="round"
              style={{ padding: "0 8px" }}
              onClick={handleAddTimeLine}
            >
              添加时间线
            </Button>
            <Button
              onClick={updateVisualized}
              type="primary"
              shape="round"
              style={{ padding: "0 8px" }}
            >
              更新可视化
              <IconRight />
            </Button>
          </ButtonGroup>
        </footer>
        <AddTimeLineModal {...AddTimeLineModalProps} />
      </StyledWrapper>
    </div>
  );
};

export default memo(ASDayTimeLineFormElems);
