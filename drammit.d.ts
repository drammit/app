declare var window: any;

interface FileUpload {
  uri: string;
  name: string;
  type: string;
}

declare type SearchFilter = 'all' | 'whisky' | 'distillery' | 'user';
