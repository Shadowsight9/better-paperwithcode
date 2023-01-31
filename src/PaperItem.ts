export interface PaperItem {
  title: string
  authors: {
    full_name: string
    url: string
  }[]
  has_code: boolean
  url: string
  has_models: boolean
  has_results: boolean
  publication_date: string

}

export interface PaperResponse {
  count: number
  next?: string
  previous?: string
  results: PaperItem[]
}
