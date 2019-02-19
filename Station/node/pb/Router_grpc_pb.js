// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var Router_pb = require('./Router_pb.js');
var loco_pb = require('./loco_pb.js');

function serialize_metro_BlockRequest(arg) {
  if (!(arg instanceof Router_pb.BlockRequest)) {
    throw new Error('Expected argument of type metro.BlockRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_BlockRequest(buffer_arg) {
  return Router_pb.BlockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_LinkRequest(arg) {
  if (!(arg instanceof Router_pb.LinkRequest)) {
    throw new Error('Expected argument of type metro.LinkRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_LinkRequest(buffer_arg) {
  return Router_pb.LinkRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_Signal(arg) {
  if (!(arg instanceof Router_pb.Signal)) {
    throw new Error('Expected argument of type metro.Signal');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_Signal(buffer_arg) {
  return Router_pb.Signal.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_StartRequest(arg) {
  if (!(arg instanceof Router_pb.StartRequest)) {
    throw new Error('Expected argument of type metro.StartRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_StartRequest(buffer_arg) {
  return Router_pb.StartRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_Status(arg) {
  if (!(arg instanceof loco_pb.Status)) {
    throw new Error('Expected argument of type metro.Status');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_Status(buffer_arg) {
  return loco_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_Token(arg) {
  if (!(arg instanceof Router_pb.Token)) {
    throw new Error('Expected argument of type metro.Token');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_Token(buffer_arg) {
  return Router_pb.Token.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_TransmitRequest(arg) {
  if (!(arg instanceof Router_pb.TransmitRequest)) {
    throw new Error('Expected argument of type metro.TransmitRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_TransmitRequest(buffer_arg) {
  return Router_pb.TransmitRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var RouterService = exports.RouterService = {
  start: {
    path: '/metro.Router/Start',
    requestStream: false,
    responseStream: false,
    requestType: Router_pb.StartRequest,
    responseType: loco_pb.Status,
    requestSerialize: serialize_metro_StartRequest,
    requestDeserialize: deserialize_metro_StartRequest,
    responseSerialize: serialize_metro_Status,
    responseDeserialize: deserialize_metro_Status,
  },
  link: {
    path: '/metro.Router/Link',
    requestStream: false,
    responseStream: false,
    requestType: Router_pb.LinkRequest,
    responseType: loco_pb.Status,
    requestSerialize: serialize_metro_LinkRequest,
    requestDeserialize: deserialize_metro_LinkRequest,
    responseSerialize: serialize_metro_Status,
    responseDeserialize: deserialize_metro_Status,
  },
  block: {
    path: '/metro.Router/Block',
    requestStream: false,
    responseStream: false,
    requestType: Router_pb.BlockRequest,
    responseType: loco_pb.Status,
    requestSerialize: serialize_metro_BlockRequest,
    requestDeserialize: deserialize_metro_BlockRequest,
    responseSerialize: serialize_metro_Status,
    responseDeserialize: deserialize_metro_Status,
  },
  transmit: {
    path: '/metro.Router/Transmit',
    requestStream: false,
    responseStream: false,
    requestType: Router_pb.TransmitRequest,
    responseType: loco_pb.Status,
    requestSerialize: serialize_metro_TransmitRequest,
    requestDeserialize: deserialize_metro_TransmitRequest,
    responseSerialize: serialize_metro_Status,
    responseDeserialize: deserialize_metro_Status,
  },
  listen: {
    path: '/metro.Router/Listen',
    requestStream: false,
    responseStream: true,
    requestType: Router_pb.Token,
    responseType: Router_pb.Signal,
    requestSerialize: serialize_metro_Token,
    requestDeserialize: deserialize_metro_Token,
    responseSerialize: serialize_metro_Signal,
    responseDeserialize: deserialize_metro_Signal,
  },
};

exports.RouterClient = grpc.makeGenericClientConstructor(RouterService);
