import React, { useCallback, useState } from "react";
import { Note } from "../Note";
import { MealModel } from "@/common/models";

export type MealSlot = MealModel & {
  onChange?: (meal: MealModel) => void;
  placeholder?: string;
  timeout?: number;
};

export const MealSlot: React.FC<MealSlot> = (props) => {
  const { date, name, note, onChange, placeholder, type } = props;
  const [isShowingNotes, setIsShowNotes] = useState(false);
  const handleClickOpenNote = useCallback(() => {
    setIsShowNotes(!isShowingNotes);
  }, [isShowingNotes]);

  const handleOnChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const modifiedName = event.target.value;
      if (name === modifiedName) return;
      onChange?.({
        date,
        note,
        name: modifiedName,
        type,
      });
    },
    [date, note, name, type, onChange],
  );

  const handleNoteChange = useCallback(
    (modifiedNote: string) => {
      if (modifiedNote === note?.message) return;
      onChange?.({
        date,
        note: { message: modifiedNote },
        name,
        type,
      });
    },
    [date, note, name, type, onChange],
  );

  return (
    <div className="meal">
      <div className="slot" data-type={props.type}>
        <input
          type="text"
          className="flex-grow"
          onChange={handleOnChangeName}
          defaultValue={props.name}
          placeholder={placeholder}
        />
        <button type="button" onClick={handleClickOpenNote}>
          {isShowingNotes ? "-" : "+"}
        </button>
      </div>
      <div className="notes" data-show={isShowingNotes}>
        <Note {...note} onChange={handleNoteChange} />
      </div>
    </div>
  );
};
