/**
 * InventoryHistory model events
 */

'use strict';

import {EventEmitter} from 'events';
import InventoryHistory from './inventory-history.model';
var InventoryHistoryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InventoryHistoryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  InventoryHistory.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    InventoryHistoryEvents.emit(event + ':' + doc._id, doc);
    InventoryHistoryEvents.emit(event, doc);
  }
}

export default InventoryHistoryEvents;
