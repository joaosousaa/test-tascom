export type createRequestType = {
  description: string;
  title: string;
}

export type putParamsType = {
  status: 'CANCELED' | 'COMPLETED'
  id: string;
}
