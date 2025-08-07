import { useState } from "react";
import { GroupConfigForm } from "./components/GroupConfigForm";
import { generateGroups } from './service/StudentService';
import type { AllDaysGroups, Student } from './types/Types';
import { StudentInputList } from './components/StudentInputList';

export const Landing = () => {
 const [ students, setStudents ] = useState<Student[]>( [] );
  const [ groupsMatrix, setGroupsMatrix ] = useState<AllDaysGroups>([]);

  const handleGenerate = (groupCount: number, dayCount: number) => {
    try {
      const result = generateGroups(students, groupCount, dayCount);
      setGroupsMatrix( result );
    } catch ( error ) {
      console.error( "Error al generar los grupos: " + ( error as Error ).message );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Generador de Grupos Aleatorios</h1>

      <StudentInputList students={ students } setStudents={ setStudents } />

      <GroupConfigForm onGenerate={handleGenerate} />

      {groupsMatrix.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Grupos generados</h2>

          {groupsMatrix.map((day, dayIndex) => (
            <div key={dayIndex} className="space-y-2">
              <h3 className="font-medium">Día {dayIndex + 1}</h3>
              {day.map((group, groupIndex) => (
                <div key={groupIndex} className="border p-2 rounded">
                  <p className="font-semibold">Grupo {groupIndex + 1}</p>
                  <ul className="list-disc list-inside">
                    {group.map((student) => (
                      <li key={student.id}>{student.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
