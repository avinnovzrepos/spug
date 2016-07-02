/**
 * Receiving model events
 */

'use strict';

import {EventEmitter} from 'events';
import Receiving from './receiving.model';
var ReceivingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ReceivingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Receiving.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ReceivingEvents.emit(event + ':' + doc._id, doc);
    ReceivingEvents.emit(event, doc);
  }
}

export default ReceivingEvents;
