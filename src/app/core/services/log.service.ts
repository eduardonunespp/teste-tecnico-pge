import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  logInfo(message: string, context?: any) {
    console.info(`[INFO] ${message}`, context || '');
  }

  logWarn(message: string, context?: any) {
    console.warn(`[WARN] ${message}`, context || '');
  }

  logError(message: string, context?: any) {
    console.error(`[ERROR] ${message}`, context || '');
  }
}
