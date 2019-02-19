// package: metro
// file: Router.proto

import * as jspb from "google-protobuf";
import * as loco_pb from "./loco_pb";

export class Token extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Token.AsObject;
  static toObject(includeInstance: boolean, msg: Token): Token.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Token, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Token;
  static deserializeBinaryFromReader(message: Token, reader: jspb.BinaryReader): Token;
}

export namespace Token {
  export type AsObject = {
    id: string,
  }
}

export class StartRequest extends jspb.Message {
  hasStation(): boolean;
  clearStation(): void;
  getStation(): loco_pb.Station | undefined;
  setStation(value?: loco_pb.Station): void;

  getUserid(): string;
  setUserid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StartRequest): StartRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartRequest;
  static deserializeBinaryFromReader(message: StartRequest, reader: jspb.BinaryReader): StartRequest;
}

export namespace StartRequest {
  export type AsObject = {
    station?: loco_pb.Station.AsObject,
    userid: string,
  }
}

export class LinkRequest extends jspb.Message {
  hasToken(): boolean;
  clearToken(): void;
  getToken(): Token | undefined;
  setToken(value?: Token): void;

  hasSrc(): boolean;
  clearSrc(): void;
  getSrc(): loco_pb.Station | undefined;
  setSrc(value?: loco_pb.Station): void;

  hasDst(): boolean;
  clearDst(): void;
  getDst(): loco_pb.Station | undefined;
  setDst(value?: loco_pb.Station): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LinkRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LinkRequest): LinkRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LinkRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LinkRequest;
  static deserializeBinaryFromReader(message: LinkRequest, reader: jspb.BinaryReader): LinkRequest;
}

export namespace LinkRequest {
  export type AsObject = {
    token?: Token.AsObject,
    src?: loco_pb.Station.AsObject,
    dst?: loco_pb.Station.AsObject,
    message: string,
  }
}

export class BlockRequest extends jspb.Message {
  hasToken(): boolean;
  clearToken(): void;
  getToken(): Token | undefined;
  setToken(value?: Token): void;

  hasSrc(): boolean;
  clearSrc(): void;
  getSrc(): loco_pb.Station | undefined;
  setSrc(value?: loco_pb.Station): void;

  hasDst(): boolean;
  clearDst(): void;
  getDst(): loco_pb.Station | undefined;
  setDst(value?: loco_pb.Station): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BlockRequest): BlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockRequest;
  static deserializeBinaryFromReader(message: BlockRequest, reader: jspb.BinaryReader): BlockRequest;
}

export namespace BlockRequest {
  export type AsObject = {
    token?: Token.AsObject,
    src?: loco_pb.Station.AsObject,
    dst?: loco_pb.Station.AsObject,
    message: string,
  }
}

export class TransmitRequest extends jspb.Message {
  hasToken(): boolean;
  clearToken(): void;
  getToken(): Token | undefined;
  setToken(value?: Token): void;

  hasSrc(): boolean;
  clearSrc(): void;
  getSrc(): loco_pb.Station | undefined;
  setSrc(value?: loco_pb.Station): void;

  hasDst(): boolean;
  clearDst(): void;
  getDst(): loco_pb.Station | undefined;
  setDst(value?: loco_pb.Station): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransmitRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TransmitRequest): TransmitRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransmitRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransmitRequest;
  static deserializeBinaryFromReader(message: TransmitRequest, reader: jspb.BinaryReader): TransmitRequest;
}

export namespace TransmitRequest {
  export type AsObject = {
    token?: Token.AsObject,
    src?: loco_pb.Station.AsObject,
    dst?: loco_pb.Station.AsObject,
    message: string,
  }
}

export class Signal extends jspb.Message {
  hasSrc(): boolean;
  clearSrc(): void;
  getSrc(): loco_pb.Station | undefined;
  setSrc(value?: loco_pb.Station): void;

  hasDst(): boolean;
  clearDst(): void;
  getDst(): loco_pb.Station | undefined;
  setDst(value?: loco_pb.Station): void;

  getMessage(): string;
  setMessage(value: string): void;

  getControl(): Signal.Control;
  setControl(value: Signal.Control): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Signal.AsObject;
  static toObject(includeInstance: boolean, msg: Signal): Signal.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Signal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Signal;
  static deserializeBinaryFromReader(message: Signal, reader: jspb.BinaryReader): Signal;
}

export namespace Signal {
  export type AsObject = {
    src?: loco_pb.Station.AsObject,
    dst?: loco_pb.Station.AsObject,
    message: string,
    control: Signal.Control,
  }

  export enum Control {
    NOT_USED = 0,
    START = 1,
    TERMINATE = 2,
    LINKED = 3,
    MESSAGE = 4,
    BLOCKED = 5,
  }
}

