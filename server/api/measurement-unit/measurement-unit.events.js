/**
 * MeasurementUnit model events
 */

'use strict';

import {EventEmitter} from 'events';
import MeasurementUnit from './measurement-unit.model';
var MeasurementUnitEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MeasurementUnitEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  MeasurementUnit.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MeasurementUnitEvents.emit(event + ':' + doc._id, doc);
    MeasurementUnitEvents.emit(event, doc);
  }
}

export default MeasurementUnitEvents;
