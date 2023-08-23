
export interface contactInterface {
  id?: number | string;
  fname: string;
  lname: string;
  status: string;
}

export interface ActionInterface {
  type: string;
  payload: any;
}
