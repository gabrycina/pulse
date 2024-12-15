import puppeteer from 'puppeteer';
import { Gym } from '@/types/gym';

export async function scrapeHussleGyms(postcode: string): Promise<Gym[]> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto(`https://www.hussle.com/search?location=${postcode}`, {
      waitUntil: 'networkidle0'
    });

    // Wait for the gym cards to load
    await page.waitForSelector('[data-testid="gym-card"]');

    const gyms = await page.evaluate(() => {
      const gymCards = document.querySelectorAll('[data-testid="gym-card"]');
      
      return Array.from(gymCards).map((card, index) => {
        const name = card.querySelector('h3')?.textContent || '';
        const location = card.querySelector('[data-testid="gym-card-location"]')?.textContent || '';
        const priceText = card.querySelector('[data-testid="gym-card-price"]')?.textContent || '';
        const price = parseFloat(priceText.replace('£', '')) || 0;
        const amenities = Array.from(card.querySelectorAll('[data-testid="gym-card-amenities"] span'))
          .map(span => span.textContent || '')
          .filter(text => text);
        
        // Extract coordinates from the map link
        const mapLink = card.querySelector('a[href*="maps"]')?.getAttribute('href') || '';
        const coordsMatch = mapLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        const coordinates = coordsMatch ? {
          lat: parseFloat(coordsMatch[1]),
          lng: parseFloat(coordsMatch[2])
        } : { lat: 51.5074, lng: -0.1278 }; // Default to London center

        return {
          id: `hussle-${index}`,
          name,
          location,
          dayPassPrice: price,
          amenities,
          website: `https://www.hussle.com${card.querySelector('a')?.getAttribute('href') || ''}`,
          coordinates
        };
      });
    });

    return gyms;
  } finally {
    await browser.close();
  }
}

// Example usage:
// const gyms = await scrapeHussleGyms('E140XA'); 