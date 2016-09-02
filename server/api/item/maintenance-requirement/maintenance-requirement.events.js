/**
 * MaintenanceRequirement model events
 */

'use strict';

import {EventEmitter} from 'events';
import MaintenanceRequirement from './maintenance-requirement.model';
var MaintenanceRequirementEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MaintenanceRequirementEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  MaintenanceRequirement.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MaintenanceRequirementEvents.emit(event + ':' + doc._id, doc);
    MaintenanceRequirementEvents.emit(event, doc);
  }
}

export default MaintenanceRequirementEvents;
