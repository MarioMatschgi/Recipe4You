import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private m_loads: string[] = [];
  get loads(): number {
    return this.m_loads.length;
  }

  get isLoading(): boolean {
    return this.loads > 0;
  }
  get finished(): boolean {
    return !this.isLoading;
  }

  constructor() {}

  load(id: string): void {
    this.m_loads.push(id);
  }

  unload(id: string): void {
    this.m_loads.splice(this.m_loads.indexOf(id), 1);
  }
}
