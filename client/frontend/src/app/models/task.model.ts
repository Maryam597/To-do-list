export interface TaskRaw {
  id?: number;
  title: string;
  dueDate?: string | null;
  description?: string | null;
  completed?: boolean;
  createdAt?: string;
  username?: string;
  selected?: boolean;
  isEditing?: boolean;
}

// Type local avec dueDate en Date
export interface Task extends Omit<TaskRaw, 'dueDate'> {
  dueDate: Date | null;
}
