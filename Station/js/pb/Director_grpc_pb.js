// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var Director_pb = require('./Director_pb.js');

function serialize_director_LinkRequest(arg) {
  if (!(arg instanceof Director_pb.LinkRequest)) {
    throw new Error('Expected argument of type director.LinkRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_director_LinkRequest(buffer_arg) {
  return Director_pb.LinkRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_director_LinkResponse(arg) {
  if (!(arg instanceof Director_pb.LinkResponse)) {
    throw new Error('Expected argument of type director.LinkResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_director_LinkResponse(buffer_arg) {
  return Director_pb.LinkResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DirectorService = exports.DirectorService = {
  link: {
    path: '/director.Director/Link',
    requestStream: false,
    responseStream: false,
    requestType: Director_pb.LinkRequest,
    responseType: Director_pb.LinkResponse,
    requestSerialize: serialize_director_LinkRequest,
    requestDeserialize: deserialize_director_LinkRequest,
    responseSerialize: serialize_director_LinkResponse,
    responseDeserialize: deserialize_director_LinkResponse,
  },
};

exports.DirectorClient = grpc.makeGenericClientConstructor(DirectorService);
