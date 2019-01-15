// package: metro
// file: Metro.proto

import * as jspb from "google-protobuf";

export class Station extends jspb.Message {
  getId(): string;
  setId(value: string): void;

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
    id: string,
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
  getCode(): number;
  setCode(value: number): void;

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
    code: number,
  }
}

export class StartRequest extends jspb.Message {
  hasStation(): boolean;
  clearStation(): void;
  getStation(): Station | undefined;
  setStation(value?: Station): void;

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
    station?: Station.AsObject,
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
  getSrc(): Station | undefined;
  setSrc(value?: Station): void;

  hasDst(): boolean;
  clearDst(): void;
  getDst(): Station | undefined;
  setDst(value?: Station): void;

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
    src?: Station.AsObject,
    dst?: Station.AsObject,
  }
}

export class TransmitRequest extends jspb.Message {
  hasToken(): boolean;
  clearToken(): void;
  getToken(): Token | undefined;
  setToken(value?: Token): void;

  hasSrc(): boolean;
  clearSrc(): void;
  getSrc(): Station | undefined;
  setSrc(value?: Station): void;

  hasDst(): boolean;
  clearDst(): void;
  getDst(): Station | undefined;
  setDst(value?: Station): void;

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
    src?: Station.AsObject,
    dst?: Station.AsObject,
    message: string,
  }
}

export class Signal extends jspb.Message {
  hasSrc(): boolean;
  clearSrc(): void;
  getSrc(): Station | undefined;
  setSrc(value?: Station): void;

  hasDst(): boolean;
  clearDst(): void;
  getDst(): Station | undefined;
  setDst(value?: Station): void;

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
    src?: Station.AsObject,
    dst?: Station.AsObject,
    message: string,
    control: Signal.Control,
  }

  export enum Control {
    NOT_USED = 0,
    START = 1,
    TERMINATE = 2,
    FORWARDED = 3,
    MESSAGE = 4,
    BLOCKED = 5,
  }
}

