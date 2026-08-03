export class EventTarget {
  constructor() {
    this._listeners = Object.create(null);
  }

  addEventListener(type, cb) {
    if (!this._listeners[type]) this._listeners[type] = [];
    this._listeners[type].push(cb);
  }

  removeEventListener(type, cb) {
    if (!this._listeners[type]) return;
    this._listeners[type] = this._listeners[type].filter(f => f !== cb);
  }

  dispatchEvent(event) {
    const list = this._listeners[event.type] || [];
    list.forEach((cb) => {
      try { cb(event); } catch (e) { console.error(e); }
    });
  }
}
