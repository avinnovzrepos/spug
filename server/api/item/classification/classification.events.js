/**
 * Classification model events
 */

'use strict';

import {EventEmitter} from 'events';
import Classification from './classification.model';
var ClassificationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ClassificationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Classification.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ClassificationEvents.emit(event + ':' + doc._id, doc);
    ClassificationEvents.emit(event, doc);
  }
}

export default ClassificationEvents;
