"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { v4 as uuidv4 } from "uuid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Users, Calendar, Shuffle, Download } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Link } from 'react-router-dom';
import { generateGroups } from '@/service/StudentService';
import type { AllDaysGroups, Student } from '@/types/Types';
import { toast } from "sonner";
import useExportImage from '@/components/ExportImage';

export default function GeneratorPage() {
  const [ name, setName ] = useState("");
  const [ groupCount, setGroupCount ] = useState<number | undefined>(undefined);
  const [ dayCount, setDayCount ] = useState<number | undefined>(undefined);
  const [ students, setStudents ] = useState<Student[]>([])
  const [ groupsMatrix, setGroupsMatrix ] = useState<AllDaysGroups>([])
  const [ showResults, setShowResults ] = useState( false )

  const { ref: exportRef, exportImage } = useExportImage({
    type: "jpeg",
    fileName: "grupos-generados",
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    
    // Excluí cualquier elemento con la clase "no-export"
    filter: (node) => !node.classList?.contains("no-export"),
    style: { backdropFilter: "none" },
    fullHeight: true,
  });

  const handleGenerate = ( groupCount: number | undefined, dayCount: number | undefined ) => {
    
    if (groupCount === undefined || dayCount === undefined) {
      groupCount = 0;
      dayCount = 0;
    }

    const studentsPerGroup = Math.floor(students.length / groupCount);

    if (students.length < groupCount) {
      return toast.error("Configuración no válida", {
        description: "La cantidad de grupos no puede ser mayor que la cantidad de alumnos.",
      });
    }

    if (studentsPerGroup < 1) {
      return toast.error("Configuración no válida", {
        description: "Cada grupo debe tener al menos un alumno.",
      });
    }

    const maxUniqueGroupings = factorial(students.length) /
      (Math.pow(factorial(studentsPerGroup), groupCount) * factorial(groupCount));

    if (dayCount > maxUniqueGroupings) {
      return toast.error("Configuración imposible", {
        description: "Con ${students.length} alumnos en ${groupCount} grupos, no hay combinaciones suficientes para ${dayCount} días.",
      });
    }

    const result = generateGroups(students, groupCount, dayCount);
    setGroupsMatrix(result);
    
    setShowResults( true );
  };

  function factorial(n: number): number {
    return n <= 1 ? 1 : n * factorial(n - 1);
  }

  const handleAdd = () => {
    if ( !name.trim() ) return;

    setStudents([
      { id: uuidv4(), name: name.trim() },
      ...students
    ]);
    setName("");
  };

  const handleRemove = ( id: string ) => {
    setStudents( students.filter( ( s ) => s.id !== id ) );
  };

  const handleKeyPress = ( e: React.KeyboardEvent ) => {
    if ( e.key === 'Enter' ) {
      handleAdd()
    }
  }

  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-teal-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
              <Users className="h-6 w-6" />
              <span className="text-xl font-bold">Generador de Grupos</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Students Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Users className="h-5 w-5 text-purple-600" />
                Gestión de Alumnos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* Add Student Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Nombre del alumno"
                  value={ name }
                  onChange={ ( e ) => setName( e.target.value ) }
                  onKeyDown={ handleKeyPress }
                  className="flex-1"
                />
                <Button 
                  onClick={ handleAdd }
                  className="bg-purple-600 hover:bg-purple-700"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Students List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                { students.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No hay alumnos agregados</p>
                    <p className="text-sm">Comienza agregando nombres arriba</p>
                  </div>
                ) : (
                  students.map(( student, index ) => (
                    <div
                      key={ index }
                      className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border"
                    >
                      <span className="font-medium">{ student.name }</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={ () => handleRemove( student.id ) }
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="ml-1">Eliminar</span>
                      </Button>
                    </div>
                  ))
                )}
              </div>

              { students.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    Total de alumnos: <span className="font-semibold">{ students.length }</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Side - Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Calendar className="h-5 w-5 text-green-600" />
                Configuración de Grupos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Group Count */}
              <div className="space-y-2">
                <Label htmlFor="groupCount" className="text-sm font-medium">
                  Cantidad de Grupos
                </Label>
                <Input
                  id="groupCount"
                  type="number"
                  placeholder="Ej: 4"
                  value={ groupCount }
                  onChange={ ( e ) => setGroupCount( Number( e.target.value ) ) }
                  min={1}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">
                  Número de grupos que deseas crear
                </p>
              </div>

              {/* Day Count */}
              <div className="space-y-2">
                <Label htmlFor="dayCount" className="text-sm font-medium">
                  Cantidad de Días
                </Label>
                <Input
                  id="dayCount"
                  type="number"
                  placeholder="Ej: 5"
                  value={dayCount}
                  onChange={ ( e ) => setDayCount( Number( e.target.value ) ) }
                  min={1}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">
                  Número de días para la rotación de grupos
                </p>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <Button 
                  onClick={ () => handleGenerate( groupCount, dayCount ) }
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                  disabled={ students.length === 0 || !groupCount || !dayCount }
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generar Grupos Aleatorios
                </Button>
                
                {( students.length === 0 || !groupCount || !dayCount ) && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Completa todos los campos para generar grupos
                  </p>
                )}
              </div>

              {/* Preview Info */}
              {students.length > 0 && groupCount && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Vista Previa:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• { students.length } alumnos total</p>
                    <p>• { groupCount } grupos</p>
                    <p>• ~{ Math.ceil( students.length / groupCount )} alumnos por grupo</p>
                    {dayCount && <p>• Rotación por { dayCount } días</p>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Modal */}
      {isMobile ? (
        <Sheet open={showResults} onOpenChange={setShowResults}>
          <SheetContent
            side="bottom"
            className="h-[90vh] overflow-y-auto bg-gradient-to-t from-teal-50 to-white"
          >
            <div ref={exportRef as any} className="p-10">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-center mb-4 text-teal-800">
                  🎯 Grupos Generados
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-6 pb-20">
                {groupsMatrix.map((day, dayIndex) => (
                  <div key={dayIndex} className="space-y-4">
                    <h3 className="text-xl font-semibold text-teal-700 flex items-center gap-2">
                      📅 Día {dayIndex + 1}
                    </h3>

                    <div className="space-y-3">
                      {day.map((group, groupIndex) => (
                        <div
                          key={groupIndex}
                          className="border-2 border-teal-200 rounded-xl p-4 bg-white/80 backdrop-blur-sm shadow-sm"
                        >
                          <h4 className="font-semibold text-lg mb-3 text-teal-600 flex items-center gap-2">
                            👥 Grupo {groupIndex + 1}
                          </h4>
                          <ul className="space-y-2">
                            {group.map((student) => (
                              <li
                                key={student.id}
                                className="flex items-center text-gray-700"
                              >
                                <span className="w-2 h-2 bg-teal-400 rounded-full mr-3" />
                                {student.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BARRA FIJA — EXCLUIDA DEL EXPORT */}
            <div className="fixed bottom-4 left-4 right-4 flex gap-3 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-teal-200 no-export">
              <Button
                onClick={() => exportImage("grupos.jpg")}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar imagen
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowResults(false)}
                className="flex-1 border-teal-300 text-teal-700 hover:bg-teal-50"
              >
                Cerrar
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        // DESKTOP
        <Dialog open={showResults} onOpenChange={setShowResults}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-teal-50 to-white">
            <div ref={exportRef as any} className="p-7">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center mb-4 text-teal-800 pb-10">
                  🎯 Grupos Generados
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 grid gap-6 grid-cols-2">
                {groupsMatrix.map((day, dayIndex) => (
                  <div key={dayIndex} className="space-y-4">
                    <h3 className="text-xl font-semibold text-teal-700 flex items-center gap-2">
                      📅 Día {dayIndex + 1}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {day.map((group, groupIndex) => (
                        <div
                          key={groupIndex}
                          className="border-2 border-teal-200 rounded-xl p-4 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <h4 className="font-semibold text-lg mb-3 text-teal-600 flex items-center gap-2">
                            👥 Grupo {groupIndex + 1}
                          </h4>
                          <ul className="space-y-2">
                            {group.map((student) => (
                              <li
                                key={student.id}
                                className="flex items-center text-gray-700"
                              >
                                <span className="w-2 h-2 bg-teal-400 rounded-full mr-3" />
                                {student.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-teal-200 no-export">
                <Button
                  onClick={() => exportImage("grupos.jpg")}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar imagen
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowResults(false)}
                  className="border-teal-300 text-teal-700 hover:bg-teal-50"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
