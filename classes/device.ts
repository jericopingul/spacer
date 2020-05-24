import { ble } from 'advlib';
import { Device as BleDevice } from 'react-native-ble-plx';

const base64ToHex = (str: string) => {
  const raw = atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  return result.toUpperCase();
};

interface RssiAdvert {
  rssi: number;
  time: number;
}

const RSSI_TIME_AVG = 30000; // 30 sec

export default class Device {
  name: string | null;
  id: string;
  _rssi: number | null;
  _txPowerLevel: number | null;
  created: number;
  _manufacturerData: string | null;
  rssiAdverts: RssiAdvert[];
  timeInDistance?: number | null;

  constructor({ name, id, rssi, txPowerLevel, manufacturerData }: BleDevice) {
    this.name = name;
    this.id = id;
    this._rssi = rssi;
    this.created = Date.now();
    this._txPowerLevel = txPowerLevel;
    this._manufacturerData = manufacturerData;
    this.rssiAdverts = [];
  }

  addRssi(rssi: number | null) {
    if (rssi) {
      this.rssiAdverts.push({
        rssi,
        time: Date.now(),
      });
    }
  }

  set txPowerLevel(power: number | null) {
    this._txPowerLevel = power;
  }

  set manufacturerData(data: string | null) {
    if (this.manufacturerData) {
      this._manufacturerData = data;
    }
  }

  get rssi() {
    return this.rssiAdverts.length ? this.rssiAdverts.slice(-1)[0].rssi : 0;
  }

  get averageRssi() {
    const cutoffTime = Date.now() - RSSI_TIME_AVG;
    const validRssiAds = this.rssiAdverts.filter((ad) => ad.time > cutoffTime);
    return Object.values(
      validRssiAds.reduce((count: { [key: number]: [number, number] }, e) => {
        const rssi = e.rssi;
        if (!(rssi in count)) {
          count[rssi] = [0, rssi];
        }
        count[rssi][0]++;
        return count;
      }, {})
    ).reduce((a, v) => (v[0] < a[0] ? a : v), [0, null])[1];
  }

  get txPowerLevel() {
    if (this._txPowerLevel) {
      return Number(this._txPowerLevel) || 0;
    }
    if (typeof this._manufacturerData !== 'string') {
      return 0;
    }
    const hex = base64ToHex(this._manufacturerData);
    const processedPacket: { txPower?: string } = ble.data.process(hex);
    return processedPacket.txPower
      ? Number(processedPacket.txPower.split('dBm')[0])
      : 0;
  }

  get distance() {
    let distance;
    try {
      let N = 2;
      let measuredPower = -65 + this.txPowerLevel;
      // 65 seems to work well
      measuredPower = -65;
      distance = Math.pow(10, (measuredPower - this.averageRssi) / (10 * N));
    } catch (err) {
      distance = 100; // skip devices with invalid distance
    }
    return distance;
  }
}
