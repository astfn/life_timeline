//components
import { StyledWrapper } from "./style";
import ASTimeInput from "@/views/day-timeline/components/time-input";
//types
import { DayTimeLineStore } from "@/views/day-timeline/store/types";
//utils
import { memo } from "react";
import { useSelector, shallowEqual } from "react-redux";

const ASDayTimeLineFormElems: React.FC = () => {
  //store
  const { formElements } = useSelector((store: any) => {
    const dayTimeLineStore = store.dayTimeLineStore as DayTimeLineStore;
    return {
      formElements: dayTimeLineStore.formElements,
    };
  }, shallowEqual);

  return (
    <div className="day-timeline-form-elems">
      <StyledWrapper>
        <h2>Ashutefannao</h2>
        {Object.entries(formElements).map(([id, formElem]) => {
          return (
            <div key={id}>
              <ASTimeInput info={formElem} defaultValue={formElem.weight} />
            </div>
          );
        })}
      </StyledWrapper>
    </div>
  );
};

export default memo(ASDayTimeLineFormElems);
