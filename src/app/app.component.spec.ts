import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture, fakeAsync, discardPeriodicTasks, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { environment } from '../environments/environment';

import { RoutePartsService } from './shared/services/route-parts.service';

import { AppComponent } from './app.component';

@Component({
  template: ''
})
class DummyComponent { }

describe('AppComponent', () => {
  let router: Router;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{
          path: '',
          component: DummyComponent
        }])
      ],
      providers: [
        RoutePartsService,
        {
          provide: ActivatedRoute,
          useValue: {
            firstChild: {
              url: of(['/']),
              outlet: 'primary',
              data: {
                title: 'myTitle'
              },
              params: of({
                snapshot: {
                  data: {
                    title: 'myTitle'
                  }
                },
                routeConfig: {
                  children: {
                    filter: () => {}
                  }
                },
                outlet: 'primary',
                value: 'testValue',
              })
            }
          }
        }
      ],
      declarations: [
        DummyComponent,
        AppComponent
      ],
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create the app', () => {
    // Given

    // When
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Then
    expect(component).toBeTruthy();
  });

  describe('UI component tests', () => {

    it(`should have as title '${environment.appName}'`, () => {
      // Given

      // When
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;

      // Then
      expect(component.appTitle).toEqual(environment.appName);
    });

    it('should render title in a h1 tag', () => {
      // Given

      // When
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      // Then
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain(`Welcome to ${environment.appName}!`);
    });

    it('should call navigation end event and set the page title when activated route snapshot returns empty',
      inject([Title], fakeAsync((title: Title) => {
        // Given
        spyOn(title, 'setTitle');
        spyOn(router, 'events').and.returnValue(
          new NavigationEnd(1, 'http://localhost:4100', 'http://localhost:4100/b')
        );

        // When
        fixture.detectChanges();

        // Then
        router.navigateByUrl('/').then(() => {
          expect(title.setTitle).toHaveBeenCalledWith(environment.appName);
        });

        discardPeriodicTasks();
      }))
    );

    it('should set the default page title when route parts length returns empty',
      inject([Title], fakeAsync((title: Title) => {
        // Given
        spyOn(title, 'setTitle');
        spyOn(router, 'events').and.returnValue(
          new NavigationEnd(1, 'http://localhost:4100', 'http://localhost:4100/b')
        );

        // When
        fixture.detectChanges();

        // Then
        router.navigateByUrl('/').then(() => {
          expect(title.setTitle).toHaveBeenCalledWith(environment.appName);
        });

        discardPeriodicTasks();
      }))
    );

    it('should set the page title to a new route title when generate route parts return a collection of routes',
      inject([Title, RoutePartsService], fakeAsync((title: Title, routePartsService: RoutePartsService) => {
        // Given
        spyOn(title, 'setTitle');
        spyOn(routePartsService, 'generateRouteParts').and.returnValue([
          {
            title: 'abc',
            breadcrumb: 'abc',
            url: '/abc'
          },
          {
            title: 'xyz',
            breadcrumb: 'xyz',
            url: '/xyz'
          }
        ]);
        spyOn(router, 'events').and.returnValue(
          new NavigationEnd(1, 'http://localhost:4100', 'http://localhost:4100/b')
        );

        // When
        fixture.detectChanges();

        // Then
        router.navigateByUrl('/').then(() => {
          expect(title.setTitle).toHaveBeenCalledWith(`xyz > abc | ${environment.appName}`);
        });

        discardPeriodicTasks();
      }))
    );
  });
});
