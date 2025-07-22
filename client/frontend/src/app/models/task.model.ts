export interface Task {
  id?: number;
  title: string;
  description?: string | null;
  completed: boolean;
  dueDate?: string | null;   
  createdAt?: string;    
  username?: string;     
  selected?: boolean;
  isEditing?: boolean;
}
