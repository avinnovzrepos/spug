/**
 * Genset model events
 */

'use strict';

import {EventEmitter} from 'events';
import Genset from './genset.model';
var GensetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GensetEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Genset.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GensetEvents.emit(event + ':' + doc._id, doc);
    GensetEvents.emit(event, doc);
  }
}

export default GensetEvents;
