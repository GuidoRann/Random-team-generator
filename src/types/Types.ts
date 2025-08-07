export type Student = {
  id: string;
  name: string;
};

export type Group = Student[];
export type DayGroups = Group[]; 
export type AllDaysGroups = DayGroups[]; 