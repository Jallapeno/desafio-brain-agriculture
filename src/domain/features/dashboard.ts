export interface Dashboard {
  perform: () => Promise<Dashboard.Result>
}

export namespace Dashboard {
  export type Result = {
    totalArea: number
    totalFarms: number
  }
}
