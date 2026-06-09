/** Semantic catalog of The Heart office photos.
 *  Photos live in src/assets/office/ — run scripts/copy-office-photos.sh once to populate.
 *  Use selectPhoto() to auto-pick the right image for a given presentation context.
 */

export type PhotoContext =
  | "brand-identity"  // reception, logo, corporate identity
  | "collaboration"   // meeting rooms, open office, working together
  | "culture"         // neon signs, team motto, company values
  | "focus"           // pods, private work, concentration
  | "social"          // lounge, kitchen, casual moments
  | "dramatic"        // night view, cinematic high-impact
  | "energy"          // motivational neon, red accents, dynamic
  | "fun"             // game room, colorful, playful
  | "workspace";      // desks, everyday working environment

export interface OfficePhoto {
  id: string;
  /** Semantic filename used in src/assets/office/ */
  filename: string;
  contexts: PhotoContext[];
  mood: "dark" | "neutral" | "bright";
  /** One-line description — used by Claude when selecting by context */
  description: string;
  /** hero photos are more visually impactful; prefer for major section dividers */
  prominence: "hero" | "standard";
}

export const OFFICE_PHOTOS: OfficePhoto[] = [
  {
    id: "reception-desk",
    filename: "reception-desk.jpg",
    contexts: ["brand-identity", "collaboration"],
    mood: "bright",
    description: "Reception desk with THE HEART branding, unicorn mural, Warsaw city view behind",
    prominence: "hero",
  },
  {
    id: "reception-corridor",
    filename: "reception-corridor.jpg",
    contexts: ["brand-identity", "culture"],
    mood: "dark",
    description: "Corridor past reception with unicorn mural and lounge glimpse",
    prominence: "standard",
  },
  {
    id: "kitchenette",
    filename: "kitchenette.jpg",
    contexts: ["social", "culture"],
    mood: "neutral",
    description: "Modern kitchenette with geometric wall design and monstera plant",
    prominence: "standard",
  },
  {
    id: "meeting-room-plane",
    filename: "meeting-room-plane.jpg",
    contexts: ["collaboration", "workspace"],
    mood: "neutral",
    description: "Meeting room 'Plane' with Wright brothers mural and conference table",
    prominence: "standard",
  },
  {
    id: "do-something-great",
    filename: "do-something-great.jpg",
    contexts: ["energy", "culture"],
    mood: "dark",
    description: "Dark corridor with 'DO SOMETHING GREAT' neon sign and red door frame",
    prominence: "hero",
  },
  {
    id: "open-office-pods",
    filename: "open-office-pods.jpg",
    contexts: ["collaboration", "workspace"],
    mood: "bright",
    description: "Open office with living plant wall and glass meeting pods",
    prominence: "standard",
  },
  {
    id: "open-office-corridor",
    filename: "open-office-corridor.jpg",
    contexts: ["workspace", "collaboration"],
    mood: "neutral",
    description: "Open office corridor with lockers, plants, and workstation area",
    prominence: "standard",
  },
  {
    id: "heartcore-team-lounge",
    filename: "heartcore-team-lounge.jpg",
    contexts: ["culture", "social", "energy"],
    mood: "dark",
    description: "Lounge with #heartcoreteam neon sign, pool table, and sofa",
    prominence: "hero",
  },
  {
    id: "kitchen-bar-neon",
    filename: "kitchen-bar-neon.jpg",
    contexts: ["social", "culture"],
    mood: "dark",
    description: "Kitchen bar area with 'Please recycle me' neon sign",
    prominence: "standard",
  },
  {
    id: "focus-pods-1",
    filename: "focus-pods-1.jpg",
    contexts: ["focus", "workspace"],
    mood: "dark",
    description: "Focus pods corridor with red-upholstered private work cabins",
    prominence: "standard",
  },
  {
    id: "focus-pods-2",
    filename: "focus-pods-2.jpg",
    contexts: ["focus", "workspace"],
    mood: "dark",
    description: "Focus pods corridor — alternate angle showing red private cabins",
    prominence: "standard",
  },
  {
    id: "kitchen-bar-slats",
    filename: "kitchen-bar-slats.jpg",
    contexts: ["social", "culture"],
    mood: "neutral",
    description: "Kitchen bar area seen through warm wooden architectural slats",
    prominence: "standard",
  },
  {
    id: "lounge-neon-city",
    filename: "lounge-neon-city.jpg",
    contexts: ["brand-identity", "social", "dramatic"],
    mood: "dark",
    description: "Lounge with The Heart geometric neon logo and Warsaw panorama at dusk",
    prominence: "hero",
  },
  {
    id: "lounge-night-city",
    filename: "lounge-night-city.jpg",
    contexts: ["dramatic", "brand-identity"],
    mood: "dark",
    description: "Cinematic night view of The Heart lounge through glass, Warsaw skyline lit up",
    prominence: "hero",
  },
  {
    id: "bubble-game-room",
    filename: "bubble-game-room.jpg",
    contexts: ["fun", "culture", "social"],
    mood: "bright",
    description: "Game room 'Bubble' with colorful chairs, PS5, playful atmosphere",
    prominence: "standard",
  },
];

/**
 * Pick the best photo for a given context.
 *
 * @param context    - semantic context key
 * @param index      - 0-based variety index (wraps); use 1, 2... for consecutive dividers
 * @param preferHero - prefer visually dominant photos (default: true for section dividers)
 */
export function selectPhoto(
  context: PhotoContext,
  index = 0,
  preferHero = true,
): OfficePhoto {
  const matches = OFFICE_PHOTOS.filter((p) => p.contexts.includes(context));
  const pool =
    preferHero && matches.some((p) => p.prominence === "hero")
      ? matches.filter((p) => p.prominence === "hero")
      : matches;
  const candidates = pool.length > 0 ? pool : OFFICE_PHOTOS;
  return candidates[index % candidates.length];
}
