/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var loco_pb = require('./loco_pb.js');
goog.exportSymbol('proto.metro.BlockRequest', null, global);
goog.exportSymbol('proto.metro.LinkRequest', null, global);
goog.exportSymbol('proto.metro.Signal', null, global);
goog.exportSymbol('proto.metro.Signal.Control', null, global);
goog.exportSymbol('proto.metro.Token', null, global);
goog.exportSymbol('proto.metro.TransmitRequest', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.metro.Token = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.metro.Token, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.metro.Token.displayName = 'proto.metro.Token';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.metro.Token.prototype.toObject = function(opt_includeInstance) {
  return proto.metro.Token.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.metro.Token} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.Token.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.metro.Token}
 */
proto.metro.Token.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.metro.Token;
  return proto.metro.Token.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.metro.Token} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.metro.Token}
 */
proto.metro.Token.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.metro.Token.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.metro.Token.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.metro.Token} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.Token.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.metro.Token.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.metro.Token.prototype.setId = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.metro.LinkRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.metro.LinkRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.metro.LinkRequest.displayName = 'proto.metro.LinkRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.metro.LinkRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.metro.LinkRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.metro.LinkRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.LinkRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    token: (f = msg.getToken()) && proto.metro.Token.toObject(includeInstance, f),
    src: (f = msg.getSrc()) && loco_pb.Station.toObject(includeInstance, f),
    dst: (f = msg.getDst()) && loco_pb.Station.toObject(includeInstance, f),
    message: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.metro.LinkRequest}
 */
proto.metro.LinkRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.metro.LinkRequest;
  return proto.metro.LinkRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.metro.LinkRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.metro.LinkRequest}
 */
proto.metro.LinkRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.metro.Token;
      reader.readMessage(value,proto.metro.Token.deserializeBinaryFromReader);
      msg.setToken(value);
      break;
    case 2:
      var value = new loco_pb.Station;
      reader.readMessage(value,loco_pb.Station.deserializeBinaryFromReader);
      msg.setSrc(value);
      break;
    case 3:
      var value = new loco_pb.Station;
      reader.readMessage(value,loco_pb.Station.deserializeBinaryFromReader);
      msg.setDst(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.metro.LinkRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.metro.LinkRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.metro.LinkRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.LinkRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToken();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.metro.Token.serializeBinaryToWriter
    );
  }
  f = message.getSrc();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      loco_pb.Station.serializeBinaryToWriter
    );
  }
  f = message.getDst();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      loco_pb.Station.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional Token token = 1;
 * @return {?proto.metro.Token}
 */
proto.metro.LinkRequest.prototype.getToken = function() {
  return /** @type{?proto.metro.Token} */ (
    jspb.Message.getWrapperField(this, proto.metro.Token, 1));
};


/** @param {?proto.metro.Token|undefined} value */
proto.metro.LinkRequest.prototype.setToken = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.metro.LinkRequest.prototype.clearToken = function() {
  this.setToken(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.LinkRequest.prototype.hasToken = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Station src = 2;
 * @return {?proto.metro.Station}
 */
proto.metro.LinkRequest.prototype.getSrc = function() {
  return /** @type{?proto.metro.Station} */ (
    jspb.Message.getWrapperField(this, loco_pb.Station, 2));
};


/** @param {?proto.metro.Station|undefined} value */
proto.metro.LinkRequest.prototype.setSrc = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.metro.LinkRequest.prototype.clearSrc = function() {
  this.setSrc(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.LinkRequest.prototype.hasSrc = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Station dst = 3;
 * @return {?proto.metro.Station}
 */
proto.metro.LinkRequest.prototype.getDst = function() {
  return /** @type{?proto.metro.Station} */ (
    jspb.Message.getWrapperField(this, loco_pb.Station, 3));
};


/** @param {?proto.metro.Station|undefined} value */
proto.metro.LinkRequest.prototype.setDst = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.metro.LinkRequest.prototype.clearDst = function() {
  this.setDst(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.LinkRequest.prototype.hasDst = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string message = 4;
 * @return {string}
 */
proto.metro.LinkRequest.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.metro.LinkRequest.prototype.setMessage = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.metro.BlockRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.metro.BlockRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.metro.BlockRequest.displayName = 'proto.metro.BlockRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.metro.BlockRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.metro.BlockRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.metro.BlockRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.BlockRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    token: (f = msg.getToken()) && proto.metro.Token.toObject(includeInstance, f),
    src: (f = msg.getSrc()) && loco_pb.Station.toObject(includeInstance, f),
    dst: (f = msg.getDst()) && loco_pb.Station.toObject(includeInstance, f),
    message: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.metro.BlockRequest}
 */
proto.metro.BlockRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.metro.BlockRequest;
  return proto.metro.BlockRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.metro.BlockRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.metro.BlockRequest}
 */
proto.metro.BlockRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.metro.Token;
      reader.readMessage(value,proto.metro.Token.deserializeBinaryFromReader);
      msg.setToken(value);
      break;
    case 2:
      var value = new loco_pb.Station;
      reader.readMessage(value,loco_pb.Station.deserializeBinaryFromReader);
      msg.setSrc(value);
      break;
    case 3:
      var value = new loco_pb.Station;
      reader.readMessage(value,loco_pb.Station.deserializeBinaryFromReader);
      msg.setDst(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.metro.BlockRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.metro.BlockRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.metro.BlockRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.BlockRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToken();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.metro.Token.serializeBinaryToWriter
    );
  }
  f = message.getSrc();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      loco_pb.Station.serializeBinaryToWriter
    );
  }
  f = message.getDst();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      loco_pb.Station.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional Token token = 1;
 * @return {?proto.metro.Token}
 */
proto.metro.BlockRequest.prototype.getToken = function() {
  return /** @type{?proto.metro.Token} */ (
    jspb.Message.getWrapperField(this, proto.metro.Token, 1));
};


/** @param {?proto.metro.Token|undefined} value */
proto.metro.BlockRequest.prototype.setToken = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.metro.BlockRequest.prototype.clearToken = function() {
  this.setToken(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.BlockRequest.prototype.hasToken = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Station src = 2;
 * @return {?proto.metro.Station}
 */
proto.metro.BlockRequest.prototype.getSrc = function() {
  return /** @type{?proto.metro.Station} */ (
    jspb.Message.getWrapperField(this, loco_pb.Station, 2));
};


/** @param {?proto.metro.Station|undefined} value */
proto.metro.BlockRequest.prototype.setSrc = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.metro.BlockRequest.prototype.clearSrc = function() {
  this.setSrc(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.BlockRequest.prototype.hasSrc = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Station dst = 3;
 * @return {?proto.metro.Station}
 */
proto.metro.BlockRequest.prototype.getDst = function() {
  return /** @type{?proto.metro.Station} */ (
    jspb.Message.getWrapperField(this, loco_pb.Station, 3));
};


/** @param {?proto.metro.Station|undefined} value */
proto.metro.BlockRequest.prototype.setDst = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.metro.BlockRequest.prototype.clearDst = function() {
  this.setDst(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.BlockRequest.prototype.hasDst = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string message = 4;
 * @return {string}
 */
proto.metro.BlockRequest.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.metro.BlockRequest.prototype.setMessage = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.metro.TransmitRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.metro.TransmitRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.metro.TransmitRequest.displayName = 'proto.metro.TransmitRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.metro.TransmitRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.metro.TransmitRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.metro.TransmitRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.TransmitRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    token: (f = msg.getToken()) && proto.metro.Token.toObject(includeInstance, f),
    src: (f = msg.getSrc()) && loco_pb.Station.toObject(includeInstance, f),
    dst: (f = msg.getDst()) && loco_pb.Station.toObject(includeInstance, f),
    message: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.metro.TransmitRequest}
 */
proto.metro.TransmitRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.metro.TransmitRequest;
  return proto.metro.TransmitRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.metro.TransmitRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.metro.TransmitRequest}
 */
proto.metro.TransmitRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.metro.Token;
      reader.readMessage(value,proto.metro.Token.deserializeBinaryFromReader);
      msg.setToken(value);
      break;
    case 2:
      var value = new loco_pb.Station;
      reader.readMessage(value,loco_pb.Station.deserializeBinaryFromReader);
      msg.setSrc(value);
      break;
    case 3:
      var value = new loco_pb.Station;
      reader.readMessage(value,loco_pb.Station.deserializeBinaryFromReader);
      msg.setDst(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.metro.TransmitRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.metro.TransmitRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.metro.TransmitRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.TransmitRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToken();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.metro.Token.serializeBinaryToWriter
    );
  }
  f = message.getSrc();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      loco_pb.Station.serializeBinaryToWriter
    );
  }
  f = message.getDst();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      loco_pb.Station.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional Token token = 1;
 * @return {?proto.metro.Token}
 */
proto.metro.TransmitRequest.prototype.getToken = function() {
  return /** @type{?proto.metro.Token} */ (
    jspb.Message.getWrapperField(this, proto.metro.Token, 1));
};


/** @param {?proto.metro.Token|undefined} value */
proto.metro.TransmitRequest.prototype.setToken = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.metro.TransmitRequest.prototype.clearToken = function() {
  this.setToken(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.TransmitRequest.prototype.hasToken = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Station src = 2;
 * @return {?proto.metro.Station}
 */
proto.metro.TransmitRequest.prototype.getSrc = function() {
  return /** @type{?proto.metro.Station} */ (
    jspb.Message.getWrapperField(this, loco_pb.Station, 2));
};


/** @param {?proto.metro.Station|undefined} value */
proto.metro.TransmitRequest.prototype.setSrc = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.metro.TransmitRequest.prototype.clearSrc = function() {
  this.setSrc(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.TransmitRequest.prototype.hasSrc = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Station dst = 3;
 * @return {?proto.metro.Station}
 */
proto.metro.TransmitRequest.prototype.getDst = function() {
  return /** @type{?proto.metro.Station} */ (
    jspb.Message.getWrapperField(this, loco_pb.Station, 3));
};


/** @param {?proto.metro.Station|undefined} value */
proto.metro.TransmitRequest.prototype.setDst = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.metro.TransmitRequest.prototype.clearDst = function() {
  this.setDst(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.TransmitRequest.prototype.hasDst = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string message = 4;
 * @return {string}
 */
proto.metro.TransmitRequest.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.metro.TransmitRequest.prototype.setMessage = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.metro.Signal = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.metro.Signal, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.metro.Signal.displayName = 'proto.metro.Signal';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.metro.Signal.prototype.toObject = function(opt_includeInstance) {
  return proto.metro.Signal.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.metro.Signal} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.Signal.toObject = function(includeInstance, msg) {
  var f, obj = {
    src: (f = msg.getSrc()) && loco_pb.Station.toObject(includeInstance, f),
    dst: (f = msg.getDst()) && loco_pb.Station.toObject(includeInstance, f),
    message: jspb.Message.getFieldWithDefault(msg, 4, ""),
    control: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.metro.Signal}
 */
proto.metro.Signal.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.metro.Signal;
  return proto.metro.Signal.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.metro.Signal} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.metro.Signal}
 */
proto.metro.Signal.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = new loco_pb.Station;
      reader.readMessage(value,loco_pb.Station.deserializeBinaryFromReader);
      msg.setSrc(value);
      break;
    case 3:
      var value = new loco_pb.Station;
      reader.readMessage(value,loco_pb.Station.deserializeBinaryFromReader);
      msg.setDst(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 5:
      var value = /** @type {!proto.metro.Signal.Control} */ (reader.readEnum());
      msg.setControl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.metro.Signal.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.metro.Signal.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.metro.Signal} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.metro.Signal.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSrc();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      loco_pb.Station.serializeBinaryToWriter
    );
  }
  f = message.getDst();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      loco_pb.Station.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getControl();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.metro.Signal.Control = {
  NOT_USED: 0,
  START: 1,
  TERMINATE: 2,
  LINKED: 3,
  MESSAGE: 4,
  BLOCKED: 5
};

/**
 * optional Station src = 2;
 * @return {?proto.metro.Station}
 */
proto.metro.Signal.prototype.getSrc = function() {
  return /** @type{?proto.metro.Station} */ (
    jspb.Message.getWrapperField(this, loco_pb.Station, 2));
};


/** @param {?proto.metro.Station|undefined} value */
proto.metro.Signal.prototype.setSrc = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.metro.Signal.prototype.clearSrc = function() {
  this.setSrc(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.Signal.prototype.hasSrc = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Station dst = 3;
 * @return {?proto.metro.Station}
 */
proto.metro.Signal.prototype.getDst = function() {
  return /** @type{?proto.metro.Station} */ (
    jspb.Message.getWrapperField(this, loco_pb.Station, 3));
};


/** @param {?proto.metro.Station|undefined} value */
proto.metro.Signal.prototype.setDst = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.metro.Signal.prototype.clearDst = function() {
  this.setDst(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.metro.Signal.prototype.hasDst = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string message = 4;
 * @return {string}
 */
proto.metro.Signal.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.metro.Signal.prototype.setMessage = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional Control control = 5;
 * @return {!proto.metro.Signal.Control}
 */
proto.metro.Signal.prototype.getControl = function() {
  return /** @type {!proto.metro.Signal.Control} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {!proto.metro.Signal.Control} value */
proto.metro.Signal.prototype.setControl = function(value) {
  jspb.Message.setProto3EnumField(this, 5, value);
};


goog.object.extend(exports, proto.metro);
