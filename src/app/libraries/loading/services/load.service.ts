import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private m_loads: { [loader: string]: number } = {};
  loads(id: string): number {
    return this.m_loads[id] ? this.m_loads[id] : 0;
  }

  isLoading(id: string = 'main'): boolean {
    return this.loads(id) > 0;
  }
  finished(id: string = 'main'): boolean {
    return !this.isLoading(id);
  }

  constructor() {}

  load(id: string = 'main'): void {
    if (!Object.keys(this.m_loads).includes(id)) this.m_loads[id] = 1;
    else this.m_loads[id]++;
  }

  unload(id: string = 'main'): void {
    if (!this.m_loads[id] || this.m_loads[id] == 1) delete this.m_loads[id];
    else this.m_loads[id]--;
  }
}
