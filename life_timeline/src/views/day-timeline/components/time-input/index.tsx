import React, { memo } from "react";
import { TimeUnitOptions } from "@/views/day-timeline/store/constants";
//components
import { StyledWrapper } from "./style";
import { Form, InputNumber } from "@arco-design/web-react";
//types
import { FormElement } from "@/views/day-timeline/store/types";

interface ASTimeInputProps {
  info: FormElement;
  [key: string]: any;
}

const FormItem = Form.Item;
const ASTimeInput: React.FC<ASTimeInputProps> = (props) => {
  const { info, ...extra } = props;
  const { name, unit } = info;

  const showLabel = (): string => `${name} (${TimeUnitOptions[unit]})`;
  return (
    <div className="as-time-input">
      <StyledWrapper>
        <FormItem label={showLabel()} layout="vertical">
          <InputNumber
            {...extra}
            min={1}
            step={1}
            precision={0}
            size="small"
            mode="button"
          />
        </FormItem>
      </StyledWrapper>
    </div>
  );
};

export default memo(ASTimeInput);
