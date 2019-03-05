import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  it('create an instance', () => {
    const pipe = new SortPipe();
    expect(pipe).toBeTruthy();
  });

  describe('When number of items is more than one and plural form is provided', () => {
    it('should return a plural form', () => {
      // Given
      const pipe = new SortPipe();
      const cars = {
        'Hondaka':
          [
            {
              model: 'Toyota',
              show: 'New York Car Show'
            },
            {
              model: 'Suzuki',
              show: 'Cartopia'
            },
            {
              model: 'Holden',
              show: 'Melbourne Motor Show'
            }
          ]
      };

      // When
      const result = pipe.transform(cars['Hondaka'], 'model');

      // Then
      expect(result).toEqual([
        {
          model: 'Holden',
          show: 'Melbourne Motor Show'
        },
        {
          model: 'Suzuki',
          show: 'Cartopia'
        },
        {
          model: 'Toyota',
          show: 'New York Car Show'
        }
      ]);
    });
  });
});
