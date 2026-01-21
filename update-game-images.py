import requests
import os
from pathlib import Path

# Game images with MULTIPLE fallback sources for better options
games = {
    'fifa23.jpg': [
        'https://media.rawg.io/media/games/234/2347ea4e8e0a4ca77c741805dd014e4d.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co1v1a.jpg',
        'https://cdn1.epicgames.com/offer/923d10cc651a429fdb20786aaad60d05/EGS_EA_SPORTS_FC_24_S1_1200x1600-f4da27a6a5e3472dfc7ad87a1d99a0b8_1200x1600-f4da27a6a5e3472dfc7ad87a1d99a0b8.jpg'
    ],
    'reddead2.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1174180/header.jpg',
        'https://media.rawg.io/media/games/511/5118aff5091cb3efb259841f1217b6f7.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co1pn7.jpg'
    ],
    'splitfiction.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1936450/header.jpg',
        'https://media.rawg.io/media/games/996/996b41d55d6ad16e8c3db2e0b0aada9c.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co6nop.jpg'
    ],
    'zelda.jpg': [
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co6tg9.jpg',
        'https://media.rawg.io/media/games/b2b/b2b8381707152afc7d185ab0dbc1b5ba.jpg',
        'https://media.rawg.io/media/games/713/7135839ebb0e49764b3b65378e7dd5f7.jpg'
    ],
    'eldenring.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/570940/header.jpg',
        'https://media.rawg.io/media/games/34/342c84ace12d76f2e72ceefef141a595.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r70.jpg'
    ],
    'cyberpunk.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1091500/header.jpg',
        'https://media.rawg.io/media/games/b7c/b7c8b5b1b8f9e8d8d4d4d4d4d4d4d4d4.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tkj.jpg'
    ],
    'starfield.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1716740/header.jpg',
        'https://media.rawg.io/media/games/a28/a28fff0408818a64988b32c1cb54396a.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co5sva.jpg'
    ],
    'codmw2.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/2084220/header.jpg',
        'https://media.rawg.io/media/games/b11/b115b8148eb12129425b6e5428f33c5f.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4soc.jpg'
    ],
    'hogwarts.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1869600/header.jpg',
        'https://media.rawg.io/media/games/713/713269608881248da2a346ee77d7e508.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4t3o.jpg'
    ],
    'baldursgate3.jpg': [
        'https://steamcdn-a.akamaihd.net/steam/apps/1238140/header.jpg',
        'https://media.rawg.io/media/games/951/951572a3bfebf840787b1ee01187e455.jpg',
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4suk.jpg'
    ]
}

db_dir = Path(__file__).parent / 'database'

def download_image(filename, url, attempt_num):
    filepath = db_dir / filename
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200 and len(response.content) > 10000:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            file_size = len(response.content) / 1024
            return True, file_size
    except Exception as e:
        pass
    
    return False, 0

print("🎮 Finding best game cover images...\n")
print(f"{'Game':<30} {'Attempt':<10} {'Size':<10} {'Status'}")
print("=" * 70)

for filename, urls in sorted(games.items()):
    game_name = filename.replace('.jpg', '')
    found = False
    
    for attempt, url in enumerate(urls, 1):
        success, size = download_image(filename, url, attempt)
        if success:
            print(f"{game_name:<30} {attempt:<10} {size:.2f} KB  ✅ Downloaded")
            found = True
            break
        else:
            status = "❌ Failed"
            if attempt < len(urls):
                print(f"{game_name:<30} {attempt:<10} -          ⏳ Trying next...")
            else:
                print(f"{game_name:<30} {attempt:<10} -          {status}")
    
    if not found:
        print(f"{game_name:<30} {'all':<10} -          ❌ All sources failed")

print("\n✨ Image update complete!")
print("\nTo update a specific game, edit the sources in the 'games' dictionary above")
print("and re-run this script.")
