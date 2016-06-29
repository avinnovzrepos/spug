/**
 * Plant model events
 */

'use strict';

import {EventEmitter} from 'events';
import Plant from './plant.model';
var PlantEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlantEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Plant.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PlantEvents.emit(event + ':' + doc._id, doc);
    PlantEvents.emit(event, doc);
  }
}

export default PlantEvents;
