export interface IVideo {
  id?: any;
  name?: string;
  type?: string;
  code?: string;
  pic?: string;
  url?: string;
  desc?: string;
  createdBy?: string;
  createdDate?: Date | null;
  lastModifiedBy?: string;
  lastModifiedDate?: Date | null;
}

export const defaultValue: Readonly<IVideo> = {
  id: '',
  name: '',
  type: '',
  code: '',
  pic: '',
  url: '',
  desc: '',
  createdBy: '',
  createdDate: null,
  lastModifiedBy: '',
  lastModifiedDate: null,
};
