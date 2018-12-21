// package: metro
// file: Metro.proto

import * as jspb from "google-protobuf";

export class Station extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getImage(): string;
  setImage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Station.AsObject;
  static toObject(includeInstance: boolean, msg: Station): Station.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Station, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Station;
  static deserializeBinaryFromReader(message: Station, reader: jspb.BinaryReader): Station;
}

export namespace Station {
  export type AsObject = {
    name: string,
    image: string,
  }
}

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

export class Status extends jspb.Message {
  getCode(): StatusCode;
  setCode(value: StatusCode): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Status.AsObject;
  static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Status;
  static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
}

export namespace Status {
  export type AsObject = {
    code: StatusCode,
  }
}

export class LinkRequest extends jspb.Message {
  hasToken(): boolean;
  clearToken(): void;
  getToken(): Token | undefined;
  setToken(value?: Token): void;

  hasStation(): boolean;
  clearStation(): void;
  getStation(): Station | undefined;
  setStation(value?: Station): void;

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
    station?: Station.AsObject,
  }
}

export class TransmitRequest extends jspb.Message {
  hasToken(): boolean;
  clearToken(): void;
  getToken(): Token | undefined;
  setToken(value?: Token): void;

  hasStation(): boolean;
  clearStation(): void;
  getStation(): Station | undefined;
  setStation(value?: Station): void;

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
    station?: Station.AsObject,
    message: string,
  }
}

export class Signal extends jspb.Message {
  hasStation(): boolean;
  clearStation(): void;
  getStation(): Station | undefined;
  setStation(value?: Station): void;

  getMessage(): string;
  setMessage(value: string): void;

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
    station?: Station.AsObject,
    message: string,
  }
}

export enum StatusCode {
  FAIL = 0,
  OK = 1,
}

