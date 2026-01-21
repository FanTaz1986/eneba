import requests
from pathlib import Path

# Only update these games with better sources
games_to_fix = {
    'baldursgate3.jpg': [
        'https://media.rawg.io/media/games/951/951572a3bfebf840787b1ee01187e455.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4suk.jpg',
        'https://cdn1.epicgames.com/offer/2c3f0ab90ec0405b946d5e5d5d5d5d5d/EGS_BaldursGate3.jpg'
    ],
    'codmw2.jpg': [
        'https://media.rawg.io/media/games/b11/b115b8148eb12129425b6e5428f33c5f.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4soc.jpg',
        'https://cdn1.epicgames.com/offer/5be5dab904ab46f7b906e5e5e5e5e5e5/EGS_CallOfDutyModernWarfare2.jpg'
    ],
    'eldenring.jpg': [
        'https://media.rawg.io/media/games/34/342c84ace12d76f2e72ceefef141a595.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r70.jpg',
        'https://cdn1.epicgames.com/offer/b9e37c27a8ca47c9a59e9e0a51c7e9f6/EGS_EldenRing_0x0.jpg'
    ],
    'fifa23.jpg': [
        'https://media.rawg.io/media/games/234/2347ea4e8e0a4ca77c741805dd014e4d.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co1v1a.jpg',
        'https://cdn1.epicgames.com/offer/b1c98b2d2e104f14a1d2c2c2c2c2c2c2/EGS_FIFA23.jpg'
    ],
    'hogwarts.jpg': [
        'https://media.rawg.io/media/games/713/713269608881248da2a346ee77d7e508.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4t3o.jpg',
        'https://cdn1.epicgames.com/offer/f0d7f0d74b12d86f4bc8c8c8c8c8c8c8/EGS_HogwartsLegacy.jpg'
    ],
    'splitfiction.jpg': [
        'https://media.rawg.io/media/games/996/996b41d55d6ad16e8c3db2e0b0aada9c.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co6nop.jpg',
        'https://cdn1.epicgames.com/offer/d1d4d1d4d1d4d1d4d1d4d1d4d1d4d1d4/EGS_SplitFiction.jpg'
    ],
    'zelda.jpg': [
        'https://media.rawg.io/media/games/b2b/b2b8381707152afc7d185ab0dbc1b5ba.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co6tg9.jpg',
        'https://media.rawg.io/media/games/713/7135839ebb0e49764b3b65378e7dd5f7.jpg'
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
        
        if response.status_code == 200 and len(response.content) > 15000:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            file_size = len(response.content) / 1024
            return True, file_size
    except Exception as e:
        pass
    
    return False, 0

print("🎮 Updating game cover art (7 games)...\n")
print(f"{'Game':<25} {'Status':<15} {'Size'}")
print("=" * 60)

updated = 0
for filename, urls in sorted(games_to_fix.items()):
    game_name = filename.replace('.jpg', '')
    
    for url in urls:
        success, size = download_image(filename, url)
        if success:
            print(f"{game_name:<25} ✅ Updated      {size:.2f} KB")
            updated += 1
            break
    else:
        print(f"{game_name:<25} ❌ Failed       -")

print(f"\n✨ Completed: {updated}/7 games updated with correct artwork!")
