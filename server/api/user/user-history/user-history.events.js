/**
 * UserHistory model events
 */

'use strict';

import {EventEmitter} from 'events';
import UserHistory from './user-history.model';
var UserHistoryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserHistoryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UserHistory.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UserHistoryEvents.emit(event + ':' + doc._id, doc);
    UserHistoryEvents.emit(event, doc);
  }
}

export default UserHistoryEvents;
