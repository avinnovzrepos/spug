/**
 * Division model events
 */

'use strict';

import {EventEmitter} from 'events';
import Division from './division.model';
var DivisionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DivisionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Division.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DivisionEvents.emit(event + ':' + doc._id, doc);
    DivisionEvents.emit(event, doc);
  }
}

export default DivisionEvents;
