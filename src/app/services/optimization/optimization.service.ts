import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { interval, map, Observable, switchMap, takeWhile } from 'rxjs';
import {
  IncomingOptimizationOptimizationDefinition,
  OutgoingOptimizationOptimizationDefinition,
  OutgoingOptimizationStateDefinition,
} from '../../../api/models';
import { OptimizationApiService } from '../../../api/services';

@Injectable({
  providedIn: 'root',
})
export class OptimizationService {
  private readonly datePipe = inject(DatePipe);
  private readonly optimizationApiService = inject(OptimizationApiService);

  startOptimization(): Observable<string | null> {
    const body = this.createDefinition();
    return this.optimizationApiService
      .optimizationCreateOptimization({ body })
      .pipe(
        map(
          (optimization: OutgoingOptimizationOptimizationDefinition) =>
            optimization.id
        )
      );
  }

  checkUntilOptimizationEnded(id: string): Observable<boolean> {
    return interval(1000).pipe(
      switchMap(() => this.optimizationEnded(id)),
      takeWhile(hasEnded => !hasEnded, true)
    );
  }

  private optimizationEnded(optimizationId: string): Observable<boolean> {
    return this.optimizationApiService
      .optimizationGetOptimizationState({
        optimizationId,
      })
      .pipe(
        map((optimization: OutgoingOptimizationStateDefinition) => {
          const state = optimization.state;
          return (
            state === 'Canceled' || state === 'Completed' || state === 'Failed'
          );
        })
      );
  }

  private createDefinition(): IncomingOptimizationOptimizationDefinition {
    const startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;

    const date = new Date();
    const oneYearFromNow = date.setFullYear(date.getFullYear() + 1);

    const endDate = this.datePipe.transform(oneYearFromNow, 'yyyy-MM-dd')!;

    const definition: IncomingOptimizationOptimizationDefinition = {
      recordedCallsFilter: {
        earliestEndDate: startDate,
        earliestStartDate: startDate,
        latestEndDate: endDate,
        latestStartDate: endDate,
      },
      startDate,
      endDate,
    };

    return definition;
  }
}
