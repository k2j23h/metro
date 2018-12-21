// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var Metro_pb = require('./Metro_pb.js');

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
