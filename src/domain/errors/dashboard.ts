export class DashboardError extends Error {
  statusCode: number
  constructor () {
    super('Error to list dashboard data')
    this.name = 'DashboardService'
    this.statusCode = 500
  }
}
