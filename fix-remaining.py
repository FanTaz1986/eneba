import requests
from pathlib import Path

# Games that still need fixing with different sources
remaining_games = {
    'baldursgate3.jpg': [
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4suk.jpg',
        'https://img.itch.zone/aW1nLzExMDUwNzA1LmpwZw==/original/Z%2BfqAA.jpg',
        'https://media.nintendo.com/releases/bg3.jpg'
    ],
    'hogwarts.jpg': [
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4t3o.jpg',
        'https://media.rawg.io/media/games/713/713269608881248da2a346ee77d7e508.jpg',
        'https://upload.wikimedia.org/wikipedia/en/e/e1/Hogwarts_Legacy_cover.jpg'
    ],
    'splitfiction.jpg': [
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co6nop.jpg',
        'https://media.rawg.io/media/games/996/996b41d55d6ad16e8c3db2e0b0aada9c.jpg',
        'https://upload.wikimedia.org/wikipedia/en/a/a6/Split_Fiction_cover_art.jpg'
    ]
}

db_dir = Path(__file__).parent / 'database'

def download_image(filename, url):
    filepath = db_dir / filename
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200 and len(response.content) > 5000:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            file_size = len(response.content) / 1024
            return True, file_size
    except Exception:
        pass
    
    return False, 0

print("🎮 Fixing remaining 3 games...\n")

for filename, urls in sorted(remaining_games.items()):
    game_name = filename.replace('.jpg', '')
    found = False
    
    for attempt, url in enumerate(urls, 1):
        success, size = download_image(filename, url)
        if success:
            print(f"✅ {game_name:<20} {size:.2f} KB")
            found = True
            break
        elif attempt < len(urls):
            print(f"⏳ {game_name:<20} Trying source {attempt + 1}...")
    
    if not found:
        print(f"❌ {game_name:<20} All sources failed")

print("\n✨ Complete!")
