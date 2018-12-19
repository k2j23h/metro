// package: director
// file: Director.proto

import * as jspb from "google-protobuf";

export class Station extends jspb.Message {
  getId(): string;
  setId(value: string): void;

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
    image: string,
  }
}

export class LinkRequest extends jspb.Message {
  clearStationsList(): void;
  getStationsList(): Array<Station>;
  setStationsList(value: Array<Station>): void;
  addStations(value?: Station, index?: number): Station;

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
    stationsList: Array<Station.AsObject>,
  }
}

export class LinkResponse extends jspb.Message {
  getState(): string;
  setState(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LinkResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LinkResponse): LinkResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LinkResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LinkResponse;
  static deserializeBinaryFromReader(message: LinkResponse, reader: jspb.BinaryReader): LinkResponse;
}

export namespace LinkResponse {
  export type AsObject = {
    state: string,
  }
}

