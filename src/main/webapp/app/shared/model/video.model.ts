export interface IVideo {
  id?: any;
  name?: string;
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
  code: '',
  pic: '',
  url: '',
  desc: '',
  createdBy: '',
  createdDate: null,
  lastModifiedBy: '',
  lastModifiedDate: null,
};
