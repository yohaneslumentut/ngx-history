/*
 * Public API Surface of ngx-history
 */

import { NgModule } from '@angular/core';
import { HistoryService } from './lib/history.service';

export * from './lib/history.service';

@NgModule({
    declarations: [],
    exports: [],
    providers: [HistoryService]
})
export class NgxHistoryModule {}
