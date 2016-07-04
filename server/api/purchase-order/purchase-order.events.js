/**
 * PurchaseOrder model events
 */

'use strict';

import {EventEmitter} from 'events';
import PurchaseOrder from './purchase-order.model';
var PurchaseOrderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PurchaseOrderEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PurchaseOrder.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PurchaseOrderEvents.emit(event + ':' + doc._id, doc);
    PurchaseOrderEvents.emit(event, doc);
  }
}

export default PurchaseOrderEvents;
