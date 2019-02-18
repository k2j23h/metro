// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var Metro_pb = require('./Metro_pb.js');

function serialize_metro_BlockRequest(arg) {
  if (!(arg instanceof Metro_pb.BlockRequest)) {
    throw new Error('Expected argument of type metro.BlockRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_BlockRequest(buffer_arg) {
  return Metro_pb.BlockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_LinkRequest(arg) {
  if (!(arg instanceof Metro_pb.LinkRequest)) {
    throw new Error('Expected argument of type metro.LinkRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_LinkRequest(buffer_arg) {
  return Metro_pb.LinkRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_Signal(arg) {
  if (!(arg instanceof Metro_pb.Signal)) {
    throw new Error('Expected argument of type metro.Signal');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_Signal(buffer_arg) {
  return Metro_pb.Signal.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_StartRequest(arg) {
  if (!(arg instanceof Metro_pb.StartRequest)) {
    throw new Error('Expected argument of type metro.StartRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_StartRequest(buffer_arg) {
  return Metro_pb.StartRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_Status(arg) {
  if (!(arg instanceof Metro_pb.Status)) {
    throw new Error('Expected argument of type metro.Status');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_Status(buffer_arg) {
  return Metro_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_Token(arg) {
  if (!(arg instanceof Metro_pb.Token)) {
    throw new Error('Expected argument of type metro.Token');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_Token(buffer_arg) {
  return Metro_pb.Token.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_metro_TransmitRequest(arg) {
  if (!(arg instanceof Metro_pb.TransmitRequest)) {
    throw new Error('Expected argument of type metro.TransmitRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_metro_TransmitRequest(buffer_arg) {
  return Metro_pb.TransmitRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var MetroService = exports.MetroService = {
  start: {
    path: '/metro.Metro/Start',
    requestStream: false,
    responseStream: false,
    requestType: Metro_pb.StartRequest,
    responseType: Metro_pb.Status,
    requestSerialize: serialize_metro_StartRequest,
    requestDeserialize: deserialize_metro_StartRequest,
    responseSerialize: serialize_metro_Status,
    responseDeserialize: deserialize_metro_Status,
  },
  link: {
    path: '/metro.Metro/Link',
    requestStream: false,
    responseStream: false,
    requestType: Metro_pb.LinkRequest,
    responseType: Metro_pb.Status,
    requestSerialize: serialize_metro_LinkRequest,
    requestDeserialize: deserialize_metro_LinkRequest,
    responseSerialize: serialize_metro_Status,
    responseDeserialize: deserialize_metro_Status,
  },
  block: {
    path: '/metro.Metro/Block',
    requestStream: false,
    responseStream: false,
    requestType: Metro_pb.BlockRequest,
    responseType: Metro_pb.Status,
    requestSerialize: serialize_metro_BlockRequest,
    requestDeserialize: deserialize_metro_BlockRequest,
    responseSerialize: serialize_metro_Status,
    responseDeserialize: deserialize_metro_Status,
  },
  transmit: {
    path: '/metro.Metro/Transmit',
    requestStream: false,
    responseStream: false,
    requestType: Metro_pb.TransmitRequest,
    responseType: Metro_pb.Status,
    requestSerialize: serialize_metro_TransmitRequest,
    requestDeserialize: deserialize_metro_TransmitRequest,
    responseSerialize: serialize_metro_Status,
    responseDeserialize: deserialize_metro_Status,
  },
  listen: {
    path: '/metro.Metro/Listen',
    requestStream: false,
    responseStream: true,
    requestType: Metro_pb.Token,
    responseType: Metro_pb.Signal,
    requestSerialize: serialize_metro_Token,
    requestDeserialize: deserialize_metro_Token,
    responseSerialize: serialize_metro_Signal,
    responseDeserialize: deserialize_metro_Signal,
  },
};

exports.MetroClient = grpc.makeGenericClientConstructor(MetroService);
