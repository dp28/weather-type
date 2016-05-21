# weather-type

A library for parsing weather type strings.

## Why

Various weather APIs provide some form of 'weather type' description, eg 'clear'
or 'light rain'. This library parses these into objects that can be compared and
combined, for example to enable averaging multiple weather types. It also
converts these descriptions to a small set of description codes.

## Install

```
npm install weather-type
```

## Example

```javascript
var WeatherType = require('weather-type');

WeatherType.default.fromString('Drizzle').map(weatherType => {
  weatherType.clouds.level === WeatherType.CloudLevel.Light; // true
  weatherType.clouds.level === WeatherType.CloudLevel.Heavy; // false

  weatherType.storm.level === WeatherType.StormLevel.None; // true

  weatherType.precipitation.level === WeatherType.PrecipitationLevel.Light; // true
  weatherType.precipitation.duration === WeatherType.PrecipitationDuration.Showers; // true
  weatherType.precipitation.type === WeatherType.PrecipitationType.Rain; // true

  weatherType.toCode(); // 'light_rain_showers'
});
```

## Design

This models weather types as a combination of several factors:
* Storm level
* Cloud level
* Precipitation level
* Precipitation type
* Precipitation duration

These each have a set of possible numeric values corresponding to a string
description. Any numeric value can be substituted for a value in a particular
WeatherType instance and, when the description code is generated, the closest
value in the range of possible values will be used. This makes it possible to
find an average WeatherType over a set of WeatherTypes by creating a
WeatherType with the average component values of the set of WeatherTypes.

## Usage

### `WeatherType.fromString(code: string): Option<WeatherType>`

Not all strings are parseable into WeatherTypes, so this returns an Option
(using [option-t](https://www.npmjs.com/package/option-t)).

### `new WeatherType(storm: Storm, precipitation: Precipitation, clouds: Clouds)`

Constructs a WeatherType instance from its components (see below).

### `WeatherType#toCode(): string`

Returns the description code that best describes this WeatherType instance,
based on its `storm`, `precipitation` and `clouds` components.

### `new Clouds(level: number)`

Possible values of `level`:
* `0` (corresponds to `'clear'`)
* `1` (corresponds to `'broken_clouds'`)
* `2` (corresponds to `'light_clouds'`)
* `3` (corresponds to `'heavy_clouds'`)
* `4` (corresponds to `'mist'`)
* `5` (corresponds to `'fog'`)

### `new Precipitation(level: number, duration: number, type: number)`

Possible values of `level`:
* `0` (corresponds to `'none'`)
* `1` (corresponds to `'light'`)
* `2` (corresponds to `'heavy'`)

Possible values of `duration`:
* `0` (corresponds to `'showers'`)
* `1` (corresponds to `'steady'`)

Possible values of `type`:
* `0` (corresponds to `'rain'`)
* `1` (corresponds to `'sleet'`)
* `2` (corresponds to `'snow'`)
* `2` (corresponds to `'hail'`)

### `new Storm(level: number)`

Possible values of `level`:
* `0` (corresponds to `'none'`)
* `1` (corresponds to `'thunderstorm'`)

## Description codes

The full list of description codes that the library can output are (in rough
order of precedence):

* thunderstorm
* heavy_hail
* heavy_snow
* heavy_sleet
* heavy_rain
* heavy_hail_showers
* heavy_snow_showers
* heavy_sleet_showers
* heavy_rain_showers
* light_hail
* light_snow
* light_sleet
* light_rain
* light_hail_showers
* light_snow_showers
* light_sleet_showers
* light_rain_showers
* Fog
* Mist
* heavy_clouds
* light_clouds
* broken_clouds
* clear

## Tests

The tests are not distributed with the npm package (to reduce its size). To
run the tests, please clone this repo from github, then run the tests:

```sh
git clone https://github.com/dp28/weather-type.git
cd weather-type
npm install
karma start
```

## License

[MIT](./LICENSE)
