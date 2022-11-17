export interface INew {
  _id: string
  author:       null
  title:        string
  description:  string
  url:          string
  source:       string
  image:        null | string
  category:     string
  language:     string
  country:      string
  published_at: string
  createdAt?: string
  updatedAt?: string
}

export interface INewData {
  _id?: string
  author:       null
  title:        string
  description:  string
  url:          string
  source:       string
  image:        null | string
  category:     string
  language:     string
  country:      string
  published_at: string
}

export interface INewResponse {
  new?: INew
  news?: INew[]
  ok: boolean
  message?: string
}