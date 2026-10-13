# Social clips for /work/social

One MP4 per reel, vertical 9:16 (1080x1920), H.264, no audio needed (they play muted), under 15 MB.
Add a first-frame JPG with the same name. Then fill the matching entry in lib/social.ts:

  video: "/video/social/reel-01.mp4", poster: "/video/social/reel-01.jpg", href: "<the live post>", date: "2026-03"

and delete its `pending` line. Encode with: avconvert --preset PresetHEVC1920x1080 is too big; use
ffmpeg -i in.mov -vf "scale=1080:1920" -c:v libx264 -crf 24 -an -movflags +faststart reel-01.mp4
