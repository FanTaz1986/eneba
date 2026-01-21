import requests
import os
from pathlib import Path

# Game images with multiple fallback sources
games = {
    'fifa23.jpg': [
        'https://media.rawg.io/media/games/234/2347ea4e8e0a4ca77c741805dd014e4d.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co1v1a.jpg'
    ],
    'baldursgate3.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1238140/header.jpg'
    ],
    'codmw2.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/2084220/header.jpg'
    ],
    'cyberpunk.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1091500/header.jpg'
    ],
    'eldenring.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/570940/header.jpg'
    ],
    'hogwarts.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1869600/header.jpg'
    ],
    'reddead2.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1174180/header.jpg'
    ],
    'splitfiction.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1936450/header.jpg'
    ],
    'starfield.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1716740/header.jpg'
    ],
    'zelda.jpg': [
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co6tg9.jpg'
    ]
}

db_dir = Path(__file__).parent / 'database'

def download_image(filename, urls):
    filepath = db_dir / filename
    
    for url in urls:
        try:
            print(f"📥 Downloading {filename} from {url[:50]}...")
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200 and len(response.content) > 10000:
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                file_size = len(response.content) / 1024
                print(f"✅ {filename}: {file_size:.2f} KB")
                return True
        except Exception as e:
            print(f"⚠️  Failed: {str(e)[:50]}")
            continue
    
    print(f"❌ Could not download {filename}")
    return False

print("🎮 Downloading game cover images...\n")

success = 0
for filename, urls in games.items():
    if download_image(filename, urls):
        success += 1

print(f"\n✨ Completed: {success}/{len(games)} images downloaded successfully!")
