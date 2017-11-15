import axios from 'axios'

const str = (str, prefix = '') => str ? `${prefix}${str}` : ''

export default class GpControlAPI {
  constructor({ ip, mac } = {}) {
    this.ip = ip || '10.5.5.9'
    this.mac = mac || 'AA:BB:CC:DD:EE:FF'
  }

  request(path, endpoint = 'gpControl', port = '') {
    const url = `http://${this.ip}${str(port, ':')}/gp/${endpoint}${str(path, '/')}`
    return axios.get(url, { timeout: 5000 }).then(r => r.data)
  }

  _command(path) { return this.request(`command${str(path, '/')}`)}

  status() { return this.request('status') }
  mode(mode, submode = 0) {
    return this._command(`sub_mode?mode=${mode}&sub_mode=${submode}`)
  }
}