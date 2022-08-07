//components
import { StyledWrapper } from "./style";
import ASTimeInput from "@/views/day-timeline/components/time-input";
import AddTimeLineModal from "@/views/day-timeline/components/AddTimeLineModal/AddTimeLineModal";
import { Button, Message } from "@arco-design/web-react";
import { IconLeft, IconRight } from "@arco-design/web-react/icon";
//types
import {
  DayTimeLineStore,
  FormElement,
} from "@/views/day-timeline/store/types";
//utils
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  useShowUsableQuantity,
  useTimeLineIsFull,
} from "@/views/day-timeline/store/hooks";
import { addTimeLineAction } from "@/views/day-timeline/store/actoinCreators";
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
  function renderFormElements() {
    return Object.entries(formElements).map(([id, formElem]) => {
      return (
        <div key={id}>
          <ASTimeInput info={formElem} defaultValue={formElem.weight} />
        </div>
      );
    });
  }

  /**
   * AddTimeLineModal 相关
   */
  const [visible, setVisible] = useState<boolean>(false);

  const AddTimeLineModalProps = {
    visible,
    setVisible,
    handleConfirm: handleConfirmAddTimeLine,
  };

  const { isFull, usableQuantity } = useTimeLineIsFull();

  const { hour, minute } = useShowUsableQuantity();
  const showUsableQuantity = `您还可分配 ${hour} 小时 ${minute} 分钟`;

  function handleConfirmAddTimeLine({
    formInfo,
    handleCancel,
  }: {
    formInfo: FormElement;
    handleCancel: Function;
  }) {
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
      setAddTimeLineSuccessMesageTrigger(!addTimeLineSuccessMesageTrigger);
      handleCancel();
    }
  }

  //添加成功后,弹出message
  const [addTimeLineSuccessMesageTrigger, setAddTimeLineSuccessMesageTrigger] =
    useState<boolean | "init">("init");

  useEffect(() => {
    if (addTimeLineSuccessMesageTrigger === "init") return;
    Message.success({
      content: `添加成功 (${showUsableQuantity})`,
    });
  }, [addTimeLineSuccessMesageTrigger, showUsableQuantity]);

  const handleAddTimeLine = useCallback(() => {
    !isFull && setVisible(true);
  }, [isFull]);

  return (
    <div className="day-timeline-form-elems">
      <StyledWrapper>
        <header>
          <h3 style={{ textAlign: "center" }}>
            您还有 {hour} 小时 {minute} 分钟可自由支配
          </h3>
        </header>
        <main>{renderFormElements()}</main>
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
            <Button type="primary" shape="round" style={{ padding: "0 8px" }}>
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
