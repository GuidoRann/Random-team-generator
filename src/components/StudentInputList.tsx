import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Student } from '../types/Types';

type Props = {
  students: Student[];
  setStudents: (students: Student[]) => void;
};

export const StudentInputList = ({ students, setStudents }: Props) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;

    setStudents([
      ...students,
      { id: uuidv4(), name: name.trim() }
    ]);
    setName("");
  };

  const handleRemove = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded w-full"
          placeholder="Nombre del alumno"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          +
        </button>
      </div>

      <ul className="space-y-1">
        {students.map((student) => (
          <li key={student.id} className="flex justify-between items-center border p-2 rounded">
            <span>{student.name}</span>
            <button
              onClick={() => handleRemove(student.id)}
              className="text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
