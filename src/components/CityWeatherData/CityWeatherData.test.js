import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderer from 'react-test-renderer';

import CityWeatherData from './CityWeatherData';

const realLocation = window.location;

beforeEach(() => {
  const mockReload = jest.fn();
  Object.defineProperty(window, 'location', {
    value: {
      reload: mockReload,
    },
  });
});

afterEach(() => {
  Object.defineProperty(window, 'location', {
    value: realLocation,
  });
});

test('SNAPSHOT: renders CityWeatherData component correctly', () => {
  const props = {
    city: 'Sydney',
    dt: 1663294555,
    temp: 21.45,
    feels_like: 21,
    sunrise: 1663294555,
    sunset: 1663294555,
    clouds: 21,
    dew_point: 333,
    wind_speed: 12,
    rain: 33,
    pressure: 22,
    uvi: 1,
    weather_description: 'cloudy',
    weather_icon: '10d',
  };
  const tree = renderer.create(<CityWeatherData {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders CityWeatherData component select element', () => {
  const props = {
    city: 'Sydney',
    dt: 1663294555,
    temp: 21.45,
    feels_like: 21,
    sunrise: 1663294555,
    sunset: 1663294555,
    clouds: 21,
    dew_point: 333,
    wind_speed: 12,
    rain: 33,
    pressure: 22,
    uvi: 1,
    weather_description: 'cloudy',
    weather_icon: '10d',
  };
  const { container } = render(<CityWeatherData {...props} />);
  expect(container.firstChild).toHaveClass('card');
  expect(container.firstChild).toHaveClass('mb-3');
});

test('toggles button icon on click', () => {
  const props = {
    city: 'Sydney',
    dt: 1663294555,
    temp: 21.45,
    feels_like: 21,
    sunrise: 1663294555,
    sunset: 1663294555,
    clouds: 21,
    dew_point: 333,
    wind_speed: 12,
    rain: 33,
    pressure: 22,
    uvi: 1,
    weather_description: 'cloudy',
    weather_icon: '10d',
  };
  const { container } = render(<CityWeatherData {...props} />);
  const button = container.querySelector('button');
  fireEvent.click(button, {});
  expect(button.firstChild).toHaveClass('bi-star-fill');
  expect(window.location.reload).toHaveBeenCalledTimes(1);
});

test('renders CityWeatherAttributes container', () => {
  const props = {
    city: 'Sydney',
    dt: 1663294555,
    temp: 21.45,
    feels_like: 21,
    sunrise: 1663294555,
    sunset: 1663294555,
    clouds: 21,
    dew_point: 333,
    wind_speed: 12,
    rain: 33,
    pressure: 22,
    uvi: 1,
    weather_description: 'cloudy',
    weather_icon: '10d',
  };
  render(<CityWeatherData {...props} />);
  const cityWeatherAttributesContainer = screen.getByTestId(
    'cityWeatherAttributes'
  );
  expect(cityWeatherAttributesContainer).toBeInTheDocument();
});
