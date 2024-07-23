export interface Todo {
  id: number;
  title: string;
  status: '未着手' | '進行中' | '完了';
  detail: string;
  deadline: string;
  creationDate: Date;
  updateDate: Date;
}

export interface TodoFilter {
  id: string;
  status: '' | '未着手' | '進行中' | '完了';
  deadline: string;
}
