//components
import { StyledWrapper } from "./style";
import ASTimeInput from "@/views/day-timeline/components/time-input";
import AddTimeLineModal from "@/views/day-timeline/components/AddTimeLineModal/AddTimeLineModal";
import {
  Button,
  Form,
  Message,
  Checkbox,
  Space,
  Progress,
} from "@arco-design/web-react";
import { IconLeft, IconRight } from "@arco-design/web-react/icon";
//types
import {
  DayTimeLineStore,
  FormElement,
} from "@/views/day-timeline/store/types";
//utils
import classNames from "classnames";
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
  useGetFormItemKeys,
  useShowUsableQuantity,
  useTimeLineIsFull,
} from "@/views/day-timeline/store/hooks";
import {
  addTimeLineAction,
  deleteFormItems_Thunk,
  updateFormItemsValue_Thunk,
} from "@/views/day-timeline/store/actoinCreators";
import { timeLineIsRepeat, toMinute } from "@/views/day-timeline/store/utils";
// import { isEmpty } from "lodash";
import useCheckbox from "@arco-design/web-react/es/Checkbox/useCheckbox";

// const CheckboxGroup = Checkbox.Group;
const ButtonGroup = Button.Group;

enum ModeEnum {
  ORDINARY,
  EDIT,
}
const newModeTemp = {
  [ModeEnum.ORDINARY]: ModeEnum.EDIT,
  [ModeEnum.EDIT]: ModeEnum.ORDINARY,
};
const ModeTitle = Object.freeze({
  [ModeEnum.ORDINARY]: "编辑",
  [ModeEnum.EDIT]: "退出编辑",
});

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

  const formItemKeys = useGetFormItemKeys();

  /**
   * 表单元素相关
   */
  const [form] = Form.useForm();
  const [formInfo, setFormInfo] = useState<{ [id: string]: string }>({});
  // const [selectFormItemKeys, setSelectFormItemKeys] = useState<string[]>([]);

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
        <div key={id} className="form-item">
          {mode === ModeEnum.EDIT && (
            <Checkbox
              value={id}
              checked={isSelected(id)}
              onChange={(checked) => {
                setValueSelected(id, checked);
              }}
            />
          )}
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

  const { isFull, usableQuantity, usableQuantityPercent } = useTimeLineIsFull();

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

  const handleAddTimeLine = useCallback(() => {
    !isFull
      ? setVisible(true)
      : Message.info({ content: "您已完美分配时间😀" });
  }, [isFull]);

  /**
   * 编辑模式相关
   */
  const [mode, setMode] = useState<ModeEnum>(ModeEnum.ORDINARY);

  const {
    isSelected,
    selected,
    setValueSelected,
    isAllSelected,
    selectAll,
    unSelectAll,
    isPartialSelected,
    toggle, //反选
  } = useCheckbox(formItemKeys, []);

  function handleChangeMode() {
    const newMode = newModeTemp[mode];
    setMode(newMode);
  }

  function handleDeleteFormItems() {
    console.log(selected);
    dispatch(
      deleteFormItems_Thunk(selected, () => {
        unSelectAll();
      })
    );
  }

  function renderEditBar() {
    return (
      <div
        className={classNames("edit-top-bar", {
          show: mode === ModeEnum.EDIT,
        })}
      >
        <Checkbox
          onChange={(checked) => {
            if (checked) {
              selectAll();
            } else {
              unSelectAll();
            }
          }}
          checked={isAllSelected()}
          indeterminate={isPartialSelected()}
        >
          全选 ({selected.length})
        </Checkbox>
        <Space size="mini">
          <Button
            size="mini"
            type="outline"
            onClick={() => {
              toggle();
            }}
          >
            反选
          </Button>
          <Button
            size="mini"
            type="outline"
            status="danger"
            onClick={handleDeleteFormItems}
          >
            确认删除
          </Button>
          <Button
            size="mini"
            type="outline"
            status="success"
            onClick={handleChangeMode}
          >
            退出编辑
          </Button>
        </Space>
      </div>
    );
  }
  return (
    <div className="day-timeline-form-elems">
      <StyledWrapper>
        <header>
          <h3 style={{ textAlign: "center" }}>
            您还有 {hour} 小时 {minute} 分钟可自由支配
          </h3>
          <Progress size="mini" percent={usableQuantityPercent} />
        </header>
        <main>
          {renderEditBar()}
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
              onClick={handleChangeMode}
              type="primary"
              shape="round"
              style={{ padding: "0 8px" }}
            >
              {ModeTitle[mode]}
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
