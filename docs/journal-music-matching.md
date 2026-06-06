# Journal Music Matching

Use this only when adding journal entries, choosing article music, or managing song cover assets.

## Asset Rules

- Journal entries may include music metadata in `src/data/journals.js` as `song: { title, cover, vibe }`.
- Cover assets live in `public/` and are referenced with root paths such as `/lost.jpg`.
- Match images by exact track and artist, then visually compare the cover before adding or replacing files.
- Do not trust generic search/API results by title alone; unrelated same-name tracks are common.
- If a cover or song identity is uncertain, leave the asset unchanged and ask for confirmation.
- Do not use `please dont let me go.jpg`, `im okay.jpg`, or `relaxed.jpg` unless the user provides verified artwork.
- `F*ck Love` is stored as `/fck love.jpg` because `*` is not valid in Windows filenames.

## Available Songs

| Song | Artist | Cover path | Best article fit |
| --- | --- | --- | --- |
| lost | Hayd | `/lost.jpg` | confusion, self-doubt, technical detours, anxiety, searching for direction |
| don't go don't leave | Hayd | `/don't go don't leave.jpg` | attachment, emotional overload, unresolved goodbye, reluctance to let go |
| love me | Hayd | `/love me.png` | soft hurt, nostalgia, longing to be understood, tenderness with pain |
| before i found her | Hayd | `/before i found her.jpg` | warmth after loneliness, important meetings, romantic or redemptive reflection |
| where'd all the time go | Hayd | `/where'd all the time go.jpg` | time passing, youth, regret, looking back at vanished days |
| how long how low | Hayd | `/how long how low.jpg` | prolonged low period, exhaustion, slow recovery |
| how close am i | Hayd | `/how close am i.jpg` | ambition, uncertainty near a goal, questioning whether effort is enough |
| healer | Hayd | `/healer.jpg` | repair, self-forgiveness, recovery after emotional injury |
| atlanta | Hayd | `/atlanta.jpg` | distance, cities, travel, leaving somewhere or someone behind |
| all of the stars | Hayd | `/all of the stars.jpg` | quiet romance, distance, night, hope, looking upward |
| burning out | Hayd | `/burning out.jpg` | study or work burnout, depleted attention, pressure, overextension |
| when you were mine | Hayd | `/when you were mine.jpg` | old love, loss, memory of a past relationship |
| what did i do | Hayd | `/what did i do.jpg` | guilt, self-blame, replaying mistakes, relationship confusion |
| airplane mode | Hayd | `/airplane mode.jpg` | disconnecting, solitude, avoiding noise, choosing silence |
| closure | Hayd | `/closure.jpg` | ending a chapter, acceptance, farewell, emotional resolution |
| changes | Hayd | `/changes.jpg` | growth, transition, identity shift, life reset |
| suffocate | Hayd | `/suffocate.jpg` | pressure, panic, being trapped, breathless anxiety |
| superhero | Hayd | `/superhero.jpg` | wanting strength, protection, self-rescue, holding things together |
| Behind the Clouds | yaeow | `/behind the clouds.jpg` | quiet sadness, soft isolation, cloudy uncertainty, gentle reflection |
| this is what winter feels like | JVKE | `/this is what winter feels like.jpg` | winter mood, emotional coldness, seasonal memory, clear but lonely beauty |
| i walk this earth all by myself | EKKSTACY | `/i walk this earth all by myself.jpg` | alienation, walking alone, numbness, detached self-observation |
| Tunnel Vision | Melanie Martinez | `/tunnel vision.jpg` | obsession, distorted focus, feeling watched or trapped in a pattern |
| Without knowing it all | LIM KIM | `/without knowing it all.jpg` | ambiguity, unfinished understanding, moving despite uncertainty |
| Gone Girl | Anson Seabra | `/gone girl.jpg` | absence, someone leaving, quiet heartbreak, memory after disappearance |
| Limbs of Faith | Beauvois | `/limbs of faith.jpg` | fragile hope, trusting the unknown, dusk-like transition |
| Dawning of Spring | Anson Seabra | `/dawning of spring.jpg` | gentle renewal, healing, first warmth after a dark period |
| City of Stars | Ryan Gosling & Emma Stone | `/city of stars.jpg` | romantic idealism, dreamlike city nights, hope mixed with longing |
| Duvet | bôa | `/duvet.jpg` | dissociation, surreal memory, late-night confusion, fragile identity |
| River | Anonymouz | `/river.jpg` | flowing forward, endurance, anime-like resolve, carrying grief through motion |
| Always | Daniel Caesar | `/always.jpg` | loyal love, enduring attachment, intimate longing, soft devotion |
| F*ck Love | Lund | `/fck love.jpg` | resentment after heartbreak, guarded emotion, defensive sadness |
| life after life | elijah woods | `/life after life.jpg` | restarting, continuity after loss, calm acceptance, life moving on |

## Selection Workflow

- Read the article first and identify the dominant emotion, not just keywords.
- Pick one song whose emotional fit is strongest; avoid stacking multiple songs for one article.
- Write `vibe` in the same tone as existing entries: concise, atmospheric, and tied to the article mood.
- If the article has mixed emotions, prioritize the final emotional landing of the piece.
