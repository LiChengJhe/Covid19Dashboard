import * as _ from 'lodash';
import { ElementRef } from '@angular/core';
export class UploaderParam {
  Uploader?: ElementRef;
  IsMultiFile? = true;
  OnFileSuccess?: (file: FileData) => void;
  BucketName?: string;
}
export class FileInfo {
  FileId?: string;
  FileName?: string;
  FileType?: string;
}
export class FileData {
  Id?: string;
  Name?: string;
  Type?: string;
  UploadDateTime?: Date;
  ObjectURL?: string;
  Bytes?: number[] = [];
}
export class FileSession {
  SessionId?: string;
  FileName?: string;
}
export class FileSessionParams {
  BucketName?:string;
  ChunkSize?: string;
  TotalSize?: string;
  FileName?: string;
}

export class FileHelper {

  static ToBase64(u8: Uint8Array): string {
    const bytes = [];
    const len = u8.byteLength;
    let i = 0;
    const chunkSize = 120000;
    while (i <= len) {
      bytes.push(String.fromCharCode.apply(null, u8.subarray(i, i + chunkSize)));
      i += chunkSize;
    }
    return btoa(bytes.join(''));
  }

  static ToBytes(base64: string): number[] {
    return atob(base64).split('').map((c) => c.charCodeAt(0));
  }

  static ToUint8Array(base64: string): Uint8Array {
    const decode: string = atob(base64);
    let n = decode.length;
    const u8 = new Uint8Array(n);
    while (n--) {
      u8[n] = decode.charCodeAt(n);
    }
    return u8;
  }

  static ToBlob(dataURL: string): Blob {
    const splitDataURL = dataURL.split(',');
    const mime = splitDataURL[0].match(/:(.*?);/)[1];
    const base64 = splitDataURL[1];
    return new Blob([this.ToUint8Array(base64)], { type: mime });
  }

  static TriggerDownload(file: FileData): void {
    const a = document.createElement('a');
    const url = file.ObjectURL;
    a.href = url;
    a.download = file.Name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  static GetDataURL(mime: string, base64: string): string {
    return 'data:' + mime + ';base64,' + base64;
  }

  static CreateFileURL(file: FileData): string {
    const dataURL: string = FileHelper.GetDataURL(
      FileHelper.LookupMIME(_.chain(file.Name).split('.').last().value())
      , file.Bytes.toString());
    return URL.createObjectURL(FileHelper.ToBlob(dataURL));
  }
  static RemoveFileURL(file: FileData): void {
    window.URL.revokeObjectURL(file.ObjectURL);
  }

  static LookupMIME(fileType: string): string {
    // if (fileType.includes('.')) {
    //   fileType = _.chain(fileType).split('.').last().value();
    // }
    return {
      '3gp': 'video/3gpp',
      apk: 'application/vnd.android.package-archive',
      asf: 'video/x-ms-asf',
      avi: 'video/x-msvideo',
      bin: 'application/octet-stream',
      bmp: 'image/bmp',
      c: 'text/plain',
      class: 'application/octet-stream',
      conf: 'text/plain',
      cpp: 'text/plain',
      exe: 'application/octet-stream',
      gif: 'image/gif',
      gtar: 'application/x-gtar',
      gz: 'application/x-gzip',
      h: 'text/plain',
      htm: 'text/html',
      html: 'text/html',
      jar: 'application/java-archive',
      java: 'text/plain',
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      js: 'application/x-javascript',
      log: 'text/plain',
      m3u: 'audio/x-mpegurl',
      m4a: 'audio/mp4a-latm',
      m4b: 'audio/mp4a-latm',
      m4p: 'audio/mp4a-latm',
      m4u: 'video/vnd.mpegurl',
      m4v: 'video/x-m4v',
      mov: 'video/quicktime',
      mp2: 'audio/x-mpeg',
      mp3: 'audio/x-mpeg',
      mp4: 'video/mp4',
      mpc: 'application/vnd.mpohun.certificate',
      mpe: 'video/mpeg',
      mpeg: 'video/mpeg',
      mpg: 'video/mpeg',
      mpg4: 'video/mp4',
      mpga: 'audio/mpeg',
      msg: 'application/vnd.ms-outlook',
      ogg: 'audio/ogg',
      pdf: 'application/pdf',
      png: 'image/png',
      pps: 'application/vnd.ms-powerpoint',
      prop: 'text/plain',
      rar: 'application/x-rar-compressed',
      rc: 'text/plain',
      rmvb: 'audio/x-pn-realaudio',
      rtf: 'application/rtf',
      sh: 'text/plain',
      tar: 'application/x-tar',
      tgz: 'application/x-compressed',
      txt: 'text/plain',
      wav: 'audio/x-wav',
      wma: 'audio/x-ms-wma',
      wmv: 'audio/x-ms-wmv',
      wps: 'application/vnd.ms-works',
      xml: 'text/plain',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.ms-excel',
      doc: 'application/msword',
      docx: 'application/msword',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.ms-powerpoint',
      z: 'application/x-compress',
      zip: 'application/zip'
    }[fileType.toLowerCase()];
  }
}
