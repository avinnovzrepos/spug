/**
 * UsageFrequency model events
 */

'use strict';

import {EventEmitter} from 'events';
import UsageFrequency from './usage-frequency.model';
var UsageFrequencyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UsageFrequencyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UsageFrequency.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UsageFrequencyEvents.emit(event + ':' + doc._id, doc);
    UsageFrequencyEvents.emit(event, doc);
  }
}

export default UsageFrequencyEvents;
