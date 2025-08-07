import { useState } from "react";

type Props = {
  onGenerate: (groupCount: number, dayCount: number) => void;
};

export const GroupConfigForm = ({ onGenerate }: Props) => {
  const [groupCount, setGroupCount] = useState(2);
  const [dayCount, setDayCount] = useState(3);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="font-medium">Cantidad de grupos</label>
        <input
          type="number"
          min={1}
          value={groupCount}
          onChange={(e) => setGroupCount(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Cantidad de días</label>
        <input
          type="number"
          min={1}
          value={dayCount}
          onChange={(e) => setDayCount(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={() => onGenerate(groupCount, dayCount)}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Generar grupos
      </button>
    </div>
  );
};
