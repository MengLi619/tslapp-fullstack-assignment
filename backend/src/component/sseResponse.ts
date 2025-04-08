import { Response } from 'express';

export class SSEResponse {
  private _writeHeader = false;

  public constructor(private readonly _res: Response) {
  }

  public send(data: unknown) {
    if (!this._writeHeader) {
      this._writeHeader = true;
      this._res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });
    }
    this._res.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}
