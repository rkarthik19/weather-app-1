import { useState } from 'react';

function Weather() {
  const [zipcode, setZipcode] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/weather?zipcode=${zipcode}`);
      const data = await response.json();
      
      if (response.ok) {
        setWeather(data);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch weather data');
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to connect to the server');
      setWeather(null);
    }
  };

  return (
    <div className="weather-container" style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Show Current Weather</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          placeholder="Enter US Zipcode"
          style={{ 
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}

      {weather && (
        <div style={{ 
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '10px' }}>Weather Results</h2>
          <p>Temperature: {weather.temperature}°{weather.unit}</p>
          <p>Zipcode: {weather.zipcode}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
