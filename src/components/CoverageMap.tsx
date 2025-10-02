import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const CoverageMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [35.5, -1.5], // Centered on East Africa
      zoom: 5,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add coverage areas
    map.current.on('load', () => {
      // East African countries coverage
      const countries = [
        { name: 'Kenya', coordinates: [36.8219, -1.2921] },
        { name: 'Tanzania', coordinates: [34.8888, -6.3690] },
        { name: 'Uganda', coordinates: [32.2903, 1.3733] },
        { name: 'Rwanda', coordinates: [29.8739, -1.9403] },
        { name: 'Burundi', coordinates: [29.3644, -3.3731] },
      ];

      countries.forEach(country => {
        const el = document.createElement('div');
        el.className = 'coverage-marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = 'hsl(95 45% 25%)';
        el.style.border = '3px solid white';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';

        new mapboxgl.Marker(el)
          .setLngLat(country.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3 style="font-weight: bold; margin: 0;">${country.name}</h3><p style="margin: 4px 0 0 0;">Full 4G/5G Coverage</p>`)
          )
          .addTo(map.current!);
      });

      // Add coverage polygon
      map.current!.addSource('coverage-area', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [28, 5],    // Northwest
              [42, 5],    // Northeast
              [42, -12],  // Southeast
              [28, -12],  // Southwest
              [28, 5]     // Close polygon
            ]]
          }
        }
      });

      map.current!.addLayer({
        id: 'coverage-area',
        type: 'fill',
        source: 'coverage-area',
        paint: {
          'fill-color': 'hsl(95 45% 25%)',
          'fill-opacity': 0.2
        }
      });

      map.current!.addLayer({
        id: 'coverage-area-outline',
        type: 'line',
        source: 'coverage-area',
        paint: {
          'line-color': 'hsl(95 45% 25%)',
          'line-width': 2
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTokenInput(false);
  };

  if (showTokenInput) {
    return (
      <section className="py-16 bg-surface">
        <div className="container px-4">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Coverage Map</h2>
            <p className="text-lg text-muted-foreground mb-8">
              See our extensive coverage across East Africa
            </p>
          </div>
          <Card className="max-w-md mx-auto p-6">
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter Mapbox Public Token
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  Get your free token at{' '}
                  <a 
                    href="https://mapbox.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
                <Input
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn-hero"
              >
                Load Map
              </button>
            </form>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-surface">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Coverage Map</h2>
          <p className="text-lg text-muted-foreground">
            See our extensive coverage across East Africa
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div 
            ref={mapContainer} 
            className="w-full h-[600px] rounded-2xl shadow-strong overflow-hidden animate-scale-in"
          />
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi'].map((country, index) => (
              <div 
                key={country}
                className="card-feature text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
                <p className="font-semibold text-sm">{country}</p>
                <p className="text-xs text-muted-foreground">Full Coverage</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMap;
