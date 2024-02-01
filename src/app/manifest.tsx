import { MetadataRoute } from "next"
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "PATH Next Train",
    "short_name": "Next PATH",
    "description": "Port Authority Trans-Hudson trains real-time departure information.",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#ffffff",
    "start_url": "./",
    "scope": "./",
    "icons": [
      {
        "src": "./icon.png",
        "type": "image/png",
        "sizes": "any"
      }
    ]
  }
}
