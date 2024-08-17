'use client';

import { WeatherInfo } from "@/components/WeatherInfo"
import { useEffect, useState } from "react";
import Link from 'next/link'

type Weather = {
  location: String,
  temperature: Number,
  windspeed: Number
}

type WeatherApiResponse = {
  title: String,
  temperature_celcius: Number,
  windspeed_kph: Number
}

export const runtime = 'edge';

export default function Page({ params }: { params: { location: string } }) {
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  useEffect(() => {
    fetch(`/api/weather?country=${params.location}`)
        .then(response => response.json<WeatherApiResponse>())
        .then(response => setWeatherData(
            {
              location: response.title,
              temperature: response.temperature_celcius,
              windspeed: response.windspeed_kph
            }
            )
        )
  }, [params.location]);
  return (
    <>
      {weatherData && (
        <>
          <div id="weather-info">
            <WeatherInfo location={weatherData.location}
                          temperature={weatherData.temperature}
                          windspeed={weatherData.windspeed}
            />
          </div>
          <Link href="/">Back</Link>
        </>
      )}

      {!weatherData && (
          <div>
            <h3 id="loading-text">Loading...</h3>
          </div>
      )}
    </>
  )
}

