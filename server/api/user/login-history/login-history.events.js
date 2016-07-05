/**
 * LoginHistory model events
 */

'use strict';

import {EventEmitter} from 'events';
import LoginHistory from './login-history.model';
var LoginHistoryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LoginHistoryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  LoginHistory.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LoginHistoryEvents.emit(event + ':' + doc._id, doc);
    LoginHistoryEvents.emit(event, doc);
  }
}

export default LoginHistoryEvents;
