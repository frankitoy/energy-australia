import { inject, TestBed } from '@angular/core/testing';

import { RoutePartsService } from './route-parts.service';
import { RoutePart } from '../models/route-part';

describe('RoutePartsService', () => {

  const snapShot = {
    url: [
      {
        path: 'foo',
      },
      {
        path: 'bar',
      },
      {
        path: 'baz',
      },
    ],
    data: {
      title: 'title',
      breadcrumb: 'breadcrumb'
    },
    params: {
    },
    queryParams: {
    },
    fragment: 'fragment',
    outlet: '/',
    component: null,
    firstChild: {
      url: [
        {
          path: 'xyz',
        },
        {
          path: 'abc',
        }
      ],
      data: {
        title: 'title2',
        breadcrumb: 'breadcrumb2'
      },
      params: {
      },
      queryParams: {
      },
      fragment: 'fragment',
      outlet: '/',
      component: null
    }
  };

  let routePartsService: RoutePartsService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(inject([RoutePartsService], (service: RoutePartsService) => {
    routePartsService = service;
  }));

  it('should be created', () => {
    routePartsService = TestBed.get(RoutePartsService);
    expect(routePartsService).toBeTruthy();
  });

  describe('generateRouteParts()', () => {

    it('should generate route parts for first child', () => {
      // Given

      // When
      const routeParts: Array<RoutePart> = routePartsService.generateRouteParts(snapShot as any);

      // Then
      expect(routeParts.length).toEqual(2);
      expect(routeParts[0].breadcrumb).toEqual('breadcrumb2');
      expect(routeParts[1].breadcrumb).toEqual('breadcrumb');
    });
  });
});
