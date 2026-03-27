# Image Model Prompt Guides

---

## Gemini Image / Nano Banana

### About the model
Nano Banana is Google's official brand name for Gemini native image generation
models. Available in the Gemini app, Google AI Studio, and Gemini API.

**Model family:**
| Brand name | Technical name | API model ID |
|---|---|---|
| Nano Banana (original) | Gemini 2.5 Flash Image | `gemini-2.5-flash-image` |
| Nano Banana Pro | Gemini 3 Pro Image | `gemini-3-pro-image-preview` |
| Nano Banana 2 | Gemini 3.1 Flash Image | `gemini-3.1-flash-image-preview` |

Nano Banana 2 is now the default in the Gemini app. Nano Banana Pro uses a
"thinking" process for complex multi-subject scenes and the best text rendering.

Known for:
- Exceptional character consistency across edits
- Precise text rendering in images (posters, infographics, labels)
- Multi-image blending (combine references into one scene)
- Real-world knowledge grounding (can reference real places, brands, events)
- One-shot editing: "change the background to a snowy forest" works reliably
- Output resolutions from 512px to 4K, 14 aspect ratios (including extreme ratios like 1:4, 8:1)
- Supports up to 14 reference images in a single prompt

### Generation prompt structure
```
[Action verb: Generate/Create] [a/an] [subject + key descriptors],
[action or pose],
[scene or setting],
[lighting conditions],
[visual style / medium],
[mood or atmosphere],
[aspect ratio if applicable].
```

### Key behaviors
- **Leans toward photorealism by default** — explicitly name a non-realistic
  style if you don't want photorealism ("flat vector illustration", "watercolor",
  "3D render with clay texture")
- **World knowledge works** — you can reference "a New York City bodega in
  winter" and it knows what that looks like
- **Text in images works well** — include exact text in quotes:
  `a poster with the text "GRAND OPENING" in bold white letters`
- **Iterative editing** — after generating, send follow-up prompts describing
  only the change. Do not re-describe the whole image.
- **Multi-reference** — you can upload multiple images and ask it to combine
  elements: "use the person from image 1 in the setting from image 2"

### Generation examples

**Product photography:**
```
Generate a professional product photograph of a small glass bottle of
serum with a dropper cap, placed on a white marble surface with a sprig
of dried lavender beside it, soft studio lighting from the left,
clean white background, commercial beauty photography style,
1:1 aspect ratio.
```

**UI marketing image:**
```
Create a clean app marketing image showing a smartphone screen displaying
a dark-themed dashboard with teal accents, the phone floating at a slight
angle on a deep navy background, soft gradient light from above,
modern tech product photography style, 16:9 aspect ratio.
```

**Infographic with text:**
```
Generate a professional infographic titled "How It Works" with 3 numbered
steps arranged vertically. Step 1: "Upload your brief", Step 2: "AI generates
directions", Step 3: "Export to Figma". Use a clean white background,
deep navy (#0F1C3F) headings, teal (#1D9E75) accent icons, Inter font style,
generous padding. 2:3 aspect ratio.
```

**Portrait with character consistency:**
```
Generate a professional headshot photo of a woman in her early 30s,
wearing a white blazer over a navy top, standing against a soft blurred
office background, natural window light, confident and approachable
expression, editorial portrait photography style, 3:4 aspect ratio.
```

### Editing prompt structure (after an existing image)
```
[Keep/preserve] [what to keep], [change/replace/add/remove] [what to change]
to [desired result]. Keep everything else exactly the same.
```

### Editing examples
```
Keep the person and outfit exactly as is, change the background to a
sun-lit café interior with soft bokeh. Keep everything else the same.
```
```
Add a wooden sign above the door that reads "STUDIO 12" in carved letters.
Keep the rest of the scene unchanged.
```
```
Replace the product label with one that says "CLARITY SERUM" in sans-serif
black text on a white label. Keep the bottle, surface, and lighting the same.
```

---

## OpenAI — GPT-4o Image / DALL-E 3

### About the models
- **DALL-E 3** (available via ChatGPT and API): Strong at artistic styles,
  illustration, concept art. Responds well to long, descriptive natural language.
  Has a safety filter that rewrites prompts — describe intent clearly to avoid
  unwanted rewrites.
- **GPT-4o image generation** (available in ChatGPT and API): More conversational,
  better at following complex multi-part instructions, supports iterative
  in-context editing across a conversation. **Much better text rendering** than
  DALL-E 3 — can reliably handle multi-word phrases, labels, and signs. Also
  supports **transparent backgrounds** (PNG/WebP output).

### Generation prompt structure
```
[Medium / style statement],
[subject description],
[action or composition],
[setting or background],
[lighting],
[color palette or mood],
[technical details: aspect ratio, quality level].
```

### Key behaviors
- **Style-first helps** — naming a medium or artist style at the start sets
  the visual register for the whole image
- **More detail = better results** — unlike Stitch (where less is more),
  OpenAI models reward detailed, specific prompts
- **DALL-E 3 rewrites prompts** — if a prompt is flagged, it silently rewrites
  it. To reduce this: avoid ambiguous language, describe intent clearly
- **GPT-4o in conversation** — you can iterate: generate once, then describe
  only what to change in the next message. It maintains context.
- **GPT-4o text rendering is strong** — a major improvement over DALL-E 3.
  For very long text or infographic-heavy images, Gemini still has the edge,
  but GPT-4o handles most text-in-image use cases reliably
- **GPT-4o transparent backgrounds** — request "transparent background" in
  the prompt or set `background: "transparent"` via API (PNG/WebP only, not JPEG)
- **Negative instructions** — "do not include text", "no watermark" are more
  reliably followed in GPT-4o than in DALL-E 3
- **Stronger for artistic/illustrated styles** than Gemini
- **DALL-E 3 API parameters:**

| Parameter | Values | Default | Notes |
|---|---|---|---|
| `quality` | `"standard"`, `"hd"` | `"standard"` | `"hd"` = finer detail, costs more |
| `style` | `"vivid"`, `"natural"` | `"vivid"` | `"natural"` = more photographic/subdued |
| `size` | `"1024x1024"`, `"1024x1792"`, `"1792x1024"` | `"1024x1024"` | Only these three sizes |

### Generation examples

**Flat vector illustration:**
```
Flat vector illustration style, a friendly robot sitting at a wooden desk
reading a glowing book, warm yellow desk lamp light, soft pastel background
in light blue and cream, minimal detail, clean lines, children's book
aesthetic, 1:1 aspect ratio.
```

**Concept art / editorial:**
```
Digital concept art, a lone architect standing on the rooftop of an unfinished
skyscraper at sunset, overlooking a dense city skyline wrapped in golden fog,
dramatic cinematic lighting, warm orange and deep blue color palette,
hyper-detailed, painterly finish, 16:9 aspect ratio.
```

**Brand illustration:**
```
Minimalist editorial illustration, a pair of hands holding a small glowing
plant sprouting from a coin, representing sustainable investment, flat color
palette in forest green, cream, and warm brown, no outlines, geometric shapes,
modern fintech brand aesthetic, 1:1 aspect ratio.
```

**Marketing hero image:**
```
Clean product marketing photography style, a MacBook laptop on a light oak
desk beside a ceramic coffee mug and a small succulent, soft natural light
from a window on the left, airy and minimal home office atmosphere,
neutral warm tones, shallow depth of field, 16:9 aspect ratio.
```

### Iterative editing in GPT-4o (conversational)
After generating an image, continue in the same conversation:

```
Keep the composition and lighting, but change the color palette to cooler
tones — deep navy and slate instead of warm browns.
```
```
Add a subtle lens flare effect from the upper right corner.
```
```
Make the background slightly more blurred to increase depth of field.
```

---

## Choosing the Right Model

| Need | Use |
|---|---|
| Consistent characters across multiple images | Gemini / Nano Banana |
| Readable text inside the image | Gemini / Nano Banana (best), GPT-4o (good) |
| Edit an existing photo with precision | Gemini / Nano Banana |
| Combine elements from multiple reference images | Gemini / Nano Banana |
| Artistic / illustrated style (watercolor, oil, concept art) | OpenAI |
| Strong composition with cinematic feel | OpenAI |
| Abstract or surreal concepts | OpenAI |
| Iterative in-conversation editing | OpenAI (GPT-4o) or Gemini |
| Transparent background (logo, asset) | OpenAI (GPT-4o) |
| UI/marketing images with real-world context | Gemini / Nano Banana |
| Photorealistic portraits or product photography | Gemini / Nano Banana |
